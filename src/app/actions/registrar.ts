'use server'

import { db } from "@/src/lib/db"
import { eq } from "drizzle-orm"
import { usuarios } from "@/src/lib/db/schema"
import { hashSenha } from "@/src/lib/auth/auth"
import { UsuarioBD } from "@/src/types/Usuario"

export async function registerAction(formData: FormData) {
    // pega os elementos do objeto FormData enviado pela requisição
    const email = formData.get('email') as string
    const nome = formData.get('nome') as string
    const senha = await hashSenha(formData.get('senha') as string)

    // ja retorna erro caso nao tenha email ou senha
    if (!email || !senha) {
        return { error: 'Preencha todos os campos.' };
    }

    // aqui checa no banco de dados se existe algum usuário onde o email bata com o enviado na requisicao
    const [usuario] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1)

    // se tiver já da erro
    if (usuario) {
        return { error: "Um usuário com este e-mail já existe!" }
    }

    const novoUsuario: UsuarioBD = {nome: nome, email: email, senha: senha}

    await db.insert(usuarios).values(novoUsuario)



    return { success: true }
}