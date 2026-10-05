'use server'

import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { usuarios } from "@/lib/db/schema"
import { hashSenha } from "@/lib/auth/auth"
import { UsuarioBD } from "@/types/Usuario"
import { redirect } from "next/navigation"

export type RegisterState = {
    error?: string
    success?: boolean
} | null

export async function registerAction(
    _prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    const nome = (formData.get('nome') as string | null)?.trim() ?? ''
    const email = (formData.get('email') as string | null)?.trim().toLowerCase() ?? ''
    const senha = (formData.get('senha') as string | null) ?? ''
    const confirmarSenha = (formData.get('confirmarSenha') as string | null) ?? ''

    if (!nome || !email || !senha || !confirmarSenha) {
        return { error: 'Preencha todos os campos obrigatórios.' }
    }

    if (nome.length > 50) {
        return { error: 'O nome deve ter no máximo 50 caracteres.' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || email.length > 150) {
        return { error: 'Por favor, insira um e-mail válido.' }
    }

    if (senha.length < 6) {
        return { error: 'A senha deve conter no mínimo 6 caracteres.' }
    }

    if (senha !== confirmarSenha) {
        return { error: 'As senhas não coincidem.' }
    }

    try {
        const [usuarioExistente] = await db
            .select()
            .from(usuarios)
            .where(eq(usuarios.email, email))
            .limit(1)

        if (usuarioExistente) {
            return { error: 'Um usuário com este e-mail já existe.' }
        }

        const senhaHash = await hashSenha(senha)
        const novoUsuario: UsuarioBD = {
            nome,
            email,
            senha: senhaHash
        }

        await db.insert(usuarios).values(novoUsuario)
    } catch (e) {
        console.error('Erro ao cadastrar usuário:', e)
        return { error: 'Ocorreu um erro ao processar o registro. Tente novamente mais tarde.' }
    }

    redirect('/login')
}