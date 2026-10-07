'use server'

import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { usuarios, funcionario } from "@/lib/db/schema"
import { verificarSenha, criarCookieSessao } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

export type LoginState = {
    error?: string
    success?: boolean
} | null

export async function loginAction(tipo: 'usuario' | 'funcionario', _prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get('email') as string
    const senha = formData.get('senha') as string

    if (!email || !senha) {
        return { error: 'Preencha todos os campos.' };
    }

    if (tipo === 'funcionario') {
        const [func] = await db.select().from(funcionario).where(eq(funcionario.email, email)).limit(1)

        if (!func) {
            return { error: "Credenciais Inválidas" }
        }

        const validarSenha = await verificarSenha(senha, func.senha)

        if (!validarSenha)
            return { error: "A senha digitada está incorreta" }

        await criarCookieSessao(func.idFuncionario, func.cargo)
        redirect("/")
    }

    // Fluxo padrão: tabela usuarios
    const [usuario] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1)

    if (!usuario) {
        return { error: "Credenciais Inválidas" }
    }

    const validarSenha = await verificarSenha(senha, usuario.senha)

    if (!validarSenha)
        return { error: "A senha digitada está incorreta" }

    await criarCookieSessao(usuario.idUsuario, null)
    redirect("/")
}