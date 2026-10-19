export type Funcionario = {
    idFuncionario: number;
    nome: string;
    email: string;
    senha: string;
    cargo: "diretor" | "gerente" | "fiscal"
}

// tipo seguro para enviar ao client (sem senha)
export type FuncionarioSeguro = Omit<Funcionario, 'senha'>

export type FuncionarioBD = {
    nome: string;
    email: string;
    senha: string;
    cargo: "diretor" | "gerente" | "fiscal"
}