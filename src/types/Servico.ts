export type MarcadorServico = {
    protocolo: number;
    status: "pendente" | "concluida" | "negada";
    categoria: "poda" | "erradicacao" | "plantio" | "rocagem"
    coordenadas: { lat: number; lng: number };
};

export type ServicoBD = {
    protocolo: number
    observacao: string
    endereco: string
    lat: number
    lng: number
    imagem: string
    status: "pendente" | "em_analise" | "concluida" | "cancelada"
    tipoServico: "poda" | "plantio" | "erradicacao" | "rocagem"
    idUsuario: number // usando o ID do usuário salvo no registro do banco de dados
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
    tipoServico: "poda" | "plantio" | "erradicacao" | "rocagem"
    nomeUsuario: string // usando o ID do usuário salvo no registro do banco de dados
}