export type Usuario = {
    idUsuario: number;
    nome: string;
    email: string;
    senha: string;
    foto?: string | null;
}

export type UsuarioBD = {
    nome: string;
    email: string;
    senha: string;
    foto?: string | null;
}