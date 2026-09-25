'use server'

import { db } from "@/src/lib/db"
import { eq } from "drizzle-orm"
import { usuarios } from "@/src/lib/db/schema"
import { verificarSenha, hashSenha, criarCookieSessao } from "@/src/lib/auth/auth"

export async function loginAction(formData: FormData) {
    // pega os elementos do objeto FormData enviado pela requisição
    const email = formData.get('email') as string
    const senha = formData.get('senha') as string

    // ja retorna erro caso nao tenha email ou senha
    if (!email || !senha) {
        return { error: 'Preencha todos os campos.' };
    }

    // aqui checa no banco de dados se existe algum usuário onde o email bata com o enviado na requisicao
    const [usuario] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1)

    // se nao tiver já da erro
    if (!usuario) {
        return { error: "Credenciais Inválidas" }
    }
    // aqui verifica se a senha registrada (com hash) vai bater com a que o usuário digitou
    const validarSenha = await verificarSenha(senha, await hashSenha(usuario.senha))

    // se retornar false é pq não bateu ai ja da erro
    if (!validarSenha)
        return { error: "A senha digitada está incorreta" }

    // aqui cria o cookie da sessão se der tudo certo e retorna true
    await criarCookieSessao(usuario.idUsuario)
    return { success: true }
}