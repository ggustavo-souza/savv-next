'use server'

export type CrudFuncionarioState = {
    error?: string
    success?: boolean
} | null

export async function criarFuncionarioAction(_prevstate: CrudFuncionarioState, formData: FormData): Promise<CrudFuncionarioState> {
    return null;
}

export async function atualizarFuncionarioAction(_prevstate: CrudFuncionarioState, formData: FormData): Promise<CrudFuncionarioState> {
    return null;
}

export async function deletarFuncionarioAction(_prevstate: CrudFuncionarioState, formData: FormData): Promise<CrudFuncionarioState> {
    return null;
}


