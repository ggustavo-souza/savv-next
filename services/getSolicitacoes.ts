'use server'

import { db } from "@/lib/db";
import { servicos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { MarcadorServico } from "../types/Servico";

export async function getSolicitacoes() {
    const marcadoresBanco = await db.select({ protocolo: servicos.protocolo, status: servicos.status, categoria: servicos.categoria, lat: servicos.lat, lng: servicos.lng }).from(servicos);

    if (marcadoresBanco.length === 0) {
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

export async function getSolicitacoesUsuario(idUsuario: number, limit: number = 5, offset: number = 0) {
    const solicitacoes = await db.select().from(servicos).where(eq(servicos.idUsuario, idUsuario)).limit(limit).offset(offset);

    if(solicitacoes.length === 0) {
        return [];
    }

    return solicitacoes;
}