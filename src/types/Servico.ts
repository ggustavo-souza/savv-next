export type MarcadorServico = {
    id: number;
    situacao: "pendente" | "concluida" | "negada";
    categoria: "poda" | "erradicacao" | "plantio" | "rocagem"
    coordenadas: { lat: number; lng: number };
};