export type Funcionario = {
    idFuncionario: number;
    nome: string;
    email: string;
    senha: string;
    cargo: "diretor" | "gerente" | "fiscal"
}

export type FuncionarioBD = {
    nome: string;
    email: string;
    senha: string;
    cargo: "diretor" | "gerente" | "fiscal"
}