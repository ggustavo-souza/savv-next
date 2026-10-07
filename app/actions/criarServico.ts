'use server'

import { db } from "@/lib/db";
import { servicos } from "@/lib/db/schema";
import { obterSessao } from "@/services/AuthCheck";
import { redirect } from "next/navigation";
import path from "path/win32";
import fs from "fs";

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

    // Processamento da imagem
    if (!imagem || imagem.size === 0) {
        return { error: 'Selecione uma imagem válida para atualizar sua imagem.' };
    }

    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(imagem.type)) {
        return { error: 'Formato de arquivo não suportado. Envie JPG, PNG ou WEBP.' };
    }

    const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
    if (imagem.size > tamanhoMaximo) {
        return { error: 'O tamanho da imagem não pode ultrapassar 5MB.' };
    }

    const extensao = path.extname(imagem.name).toLowerCase() || '.jpg';
    const nomeArquivo = `${crypto.randomUUID()}_${Date.now()}${extensao}`;

    const pastaDestino = path.join('/repository');

    const buffer = Buffer.from(await imagem.arrayBuffer());
    const caminhoArquivo = path.join(pastaDestino, nomeArquivo);
    await fs.promises.writeFile(caminhoArquivo, buffer);


    try {
        await db.insert(servicos).values({
            observacao,
            endereco,
            lat,
            lng,
            imagem: caminhoArquivo,
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
