'use server'

import { db } from "@/lib/db";
import { usuarios } from "@/lib/db/schema";
import { obterSessao } from "@/services/AuthCheck";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export type AtualizarFotoState = {
    error?: string;
    success?: boolean;
    message?: string;
} | null;

export async function atualizarFotoAction(
    _prevState: AtualizarFotoState,
    formData: FormData
): Promise<AtualizarFotoState> {
    const sessao = await obterSessao();

    if (!sessao || !sessao.userId) {
        return { error: 'Usuário não autenticado.' };
    }

    const foto = formData.get('foto') as File | null;

    if (!foto || foto.size === 0) {
        return { error: 'Selecione uma imagem válida para atualizar sua foto.' };
    }

    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(foto.type)) {
        return { error: 'Formato de arquivo não suportado. Envie JPG, PNG ou WEBP.' };
    }

    const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
    if (foto.size > tamanhoMaximo) {
        return { error: 'O tamanho da imagem não pode ultrapassar 5MB.' };
    }

    try {
        const extensao = path.extname(foto.name).toLowerCase() || '.jpg';
        const nomeArquivo = `perfil_${sessao.userId}_${Date.now()}${extensao}`;

        const pastaDestino = path.join(process.cwd(), 'public', 'repository');
        await fs.promises.mkdir(pastaDestino, { recursive: true });

        const buffer = Buffer.from(await foto.arrayBuffer());
        const caminhoArquivo = path.join(pastaDestino, nomeArquivo);
        await fs.promises.writeFile(caminhoArquivo, buffer);

        await db
            .update(usuarios)
            .set({ foto: nomeArquivo })
            .where(eq(usuarios.idUsuario, sessao.userId));

        revalidatePath('/minhaconta');

        return { success: true, message: 'Foto de perfil atualizada com sucesso!' };
    } catch (e) {
        console.error('Erro ao atualizar foto de perfil:', e);
        return { error: 'Ocorreu um erro ao atualizar sua foto. Tente novamente mais tarde.' };
    }
}
