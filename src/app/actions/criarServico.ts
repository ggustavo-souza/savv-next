'use server'

import { db } from "@/src/lib/db";
import { servicos } from "@/src/lib/db/schema";
import { obterSessao } from "@/src/services/AuthCheck";
import { redirect } from "next/navigation";

export type CriarServicoState = {
    error?: string;
    success?: boolean;
} | null;

export async function criarServicoAction(_prevState: CriarServicoState, formData: FormData): Promise<CriarServicoState> {
    const sessao = await obterSessao();
    
    if (!sessao || !sessao.userId) {
        return { error: 'Usuário não autenticado.' };
    }

    const observacao = formData.get('observacao') as string;
    const endereco = formData.get('endereco') as string;
    const latStr = formData.get('lat') as string;
    const lngStr = formData.get('lng') as string;
    const imagem = formData.get('imagem') as File | null;
    const categoria = formData.get('categoria') as "poda" | "plantio" | "erradicacao" | "rocagem";

    if (!observacao || !endereco || !latStr || !lngStr || !categoria) {
        return { error: 'Preencha todos os campos obrigatórios.' };
    }

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng)) {
        return { error: 'Coordenadas inválidas.' };
    }

    // Processamento da imagem (simplificado para o escopo do app)
    let caminhoImagem = '';
    if (imagem && imagem.size > 0) {
        caminhoImagem = `/uploads/${Date.now()}-${imagem.name}`;
    } else {
        return { error: 'É obrigatório enviar uma imagem da ocorrência.' };
    }

    try {
        await db.insert(servicos).values({
            observacao,
            endereco,
            lat,
            lng,
            imagem: caminhoImagem,
            status: 'pendente',
            categoria,
            data: new Date(),
            idUsuario: sessao.userId
        });

    } catch (e) {
        if (e instanceof Error) {
            console.error("Erro ao inserir servico:", e.message);
            return { error: 'Ocorreu um erro interno ao salvar a solicitação.' };
        }
        return { error: 'Erro desconhecido ao salvar solicitação.' };
    }

    redirect('/');
}
