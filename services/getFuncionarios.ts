'use server'

import { db } from '@/lib/db'
import { funcionario } from '@/lib/db/schema'
import { checarAutenticacao } from '@/services/AuthCheck'
import { FuncionarioSeguro } from '@/types/Funcionario'
import { eq } from 'drizzle-orm'

// busca todos os funcionarios cadastrados sem mostrar a senha
export async function getFuncionarios(): Promise<FuncionarioSeguro[]> {
    const auth = await checarAutenticacao()

    if (!auth || auth.cargo !== 'diretor') {
        throw new Error('Acesso não autorizado.')
    }

    const resultado = await db
        .select({
            idFuncionario: funcionario.idFuncionario,
            nome: funcionario.nome,
            email: funcionario.email,
            cargo: funcionario.cargo,
        })
        .from(funcionario)

    return resultado
}

// busca todos os fiscais cadastrados para atribuicao
export async function getFiscais(): Promise<FuncionarioSeguro[]> {
    const auth = await checarAutenticacao()

    if (!auth || (auth.cargo !== 'diretor' && auth.cargo !== 'gerente')) {
        throw new Error('Acesso não autorizado.')
    }

    const resultado = await db
        .select({
            idFuncionario: funcionario.idFuncionario,
            nome: funcionario.nome,
            email: funcionario.email,
            cargo: funcionario.cargo,
        })
        .from(funcionario)
        .where(eq(funcionario.cargo, 'fiscal'))

    return resultado
}
