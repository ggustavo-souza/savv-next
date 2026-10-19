'use server'

import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { funcionario } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { hashSenha } from "@/lib/auth/auth"
import { FuncionarioBD } from "@/types/Funcionario"

export type CrudFuncionarioState = {
    error?: string
    success?: boolean
} | null

export async function criarFuncionarioAction(_prevstate: CrudFuncionarioState, formData: FormData): Promise<CrudFuncionarioState> {
    const nome = (formData.get('nome') as string | null)?.trim() ?? ''
    const email = (formData.get('email') as string | null)?.trim().toLowerCase() ?? ''
    const cargo = (formData.get('cargo') as string | null)?.trim() ?? ''
    const senha = (formData.get('senha') as string | null)?.trim() ?? ''

    if (!nome || !email || !senha || !cargo) {
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

    try {
        const [usuarioExistente] = await db
            .select()
            .from(funcionario)
            .where(eq(funcionario.email, email))
            .limit(1)

        if (usuarioExistente) {
            return { error: 'Um funcionário com este e-mail já existe.' }
        }

        const senhaHash = await hashSenha(senha)
        const novoFuncionario: FuncionarioBD = {
            nome,
            email,
            senha: senhaHash,
            cargo: cargo as FuncionarioBD['cargo'],
        }

        await db.insert(funcionario).values(novoFuncionario)
    } catch (e) {
        console.error('Erro ao cadastrar funcionário:', e)
        return { error: 'Ocorreu um erro ao processar o registro. Tente novamente mais tarde.' }
    }

    return {success: true}
}

export async function atualizarFuncionarioAction(_prevstate: CrudFuncionarioState, formData: FormData): Promise<CrudFuncionarioState> {
    return null;
}

export async function deletarFuncionarioAction(_prevstate: CrudFuncionarioState, formData: FormData): Promise<CrudFuncionarioState> {
    return null;
}


