import { db } from "@/lib/db";
import { servicos } from "@/lib/db/schema";
import { MarcadorServico } from "../types/Servico";

export default async function getSolicitacoes() {
    const marcadoresBanco = await db.select({ protocolo: servicos.protocolo, status: servicos.status, categoria: servicos.categoria, lat: servicos.lat, lng: servicos.lng }).from(servicos);

    if(marcadoresBanco.length === 0) {
        return [];
    }

    const marcadores: MarcadorServico[] = marcadoresBanco.map((marcador) => ({
        protocolo: marcador.protocolo,
        status: marcador.status,
        categoria: marcador.categoria,
        coordenadas: {
            lat: marcador.lat,
            lng: marcador.lng
        }
    }));

    return marcadores;
}