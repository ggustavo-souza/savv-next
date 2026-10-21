export type MarcadorServico = {
    protocolo: number;
    status: "pendente" | "em_analise" | "concluida" | "cancelada";
    categoria: "poda" | "erradicacao" | "plantio" | "rocagem";
    coordenadas: { lat: number; lng: number };
};

export type ServicoBD = {
    observacao: string
    endereco: string
    lat: number
    lng: number
    imagem: string
    status: "pendente" | "em_analise" | "concluida" | "cancelada"
    categoria: "poda" | "plantio" | "erradicacao" | "rocagem"
    idUsuario: number // usando o ID do usuário salvo no registro do banco de dados
    idFiscal: number // usando o ID do fiscal salvo no registro do banco de dados (podendo ser null)
}

export type ServicoApp = {
    protocolo: number
    data: string
    observacao: string
    endereco: string
    lat: number
    lng: number
    imagem: string
    status: "pendente" | "em_analise" | "concluida" | "cancelada"
    categoria: "poda" | "plantio" | "erradicacao" | "rocagem"
    atribuicao: "gerente" | "fiscal" | "fechada"
    nomeUsuario: string // usando o ID do usuário salvo no registro do banco de dados
    nomeFiscal: string //usando o ID do fiscal salvo no registro do banco de dados
}