'use server'

import { obterSessao } from "@/services/AuthCheck";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { servicos } from "@/lib/db/schema";
import { historico } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export type devolverSolicitacaoState = {
    error?: string;
    success?: boolean;
    message?: string;
} | null;

export async function devolverSolicitacaoAction(
    _prevState: devolverSolicitacaoState,
    formData: FormData
): Promise<devolverSolicitacaoState> {
    const sessao = await obterSessao();

    if (!sessao || !sessao.userId || sessao.cargo !== 'fiscal') {
        return { error: 'Apenas fiscais tem a permissão de devolver solicitações.' };
    }

    const protocoloStr = formData.get('protocolo') as string;
    const tipoDevolucao = formData.get('tipoDevolucao') as string;
    const protocolo = parseInt(protocoloStr, 10);

    if (!protocolo || isNaN(protocolo)) {
        return { error: 'Protocolo de solicitação inválido.' };
    }

    try {
        const [solicitacao] = await db
            .select()
            .from(servicos)
            .where(eq(servicos.protocolo, protocolo))
            .limit(1);

        if (!solicitacao) {
            return { error: 'Solicitação não encontrada.' };
        }

        if (solicitacao.status !== 'em_analise') {
            return { error: 'Esta solicitação já possui um veredito definido e não pode mais ser alterada.' };
        }

        if (tipoDevolucao === 'devolver') {
            await db.transaction(async (tx) => {
                await tx
                    .update(servicos)
                    .set({
                        status: 'devolvida',
                    })
                    .where(eq(servicos.protocolo, protocolo));

                // Registra auditoria no histórico
                await tx.insert(historico).values({
                    protocolo,
                    idFuncionario: sessao.userId,
                    atualizacao: `Solicitação aprovada e devolvida com sucesso para os gerentes finalizarem.`,
                    data: new Date(),
                });
            });

            revalidatePath(`/admin/fiscal/${protocolo}`);
            revalidatePath('/admin/fiscal');

            return { success: true, message: 'Solicitação devolvida com sucesso!' };
        } else if (tipoDevolucao === 'cancelar') {
            await db.transaction(async (tx) => {
                await tx
                    .update(servicos)
                    .set({
                        status: 'cancelada',
                    })
                    .where(eq(servicos.protocolo, protocolo));

                // Registra auditoria no histórico
                await tx.insert(historico).values({
                    protocolo,
                    idFuncionario: sessao.userId,
                    atualizacao: `Solicitação cancelada e devolvida para os gerentes finalizarem.`,
                    data: new Date(),
                });
            });

            revalidatePath(`/admin/fiscal/${protocolo}`);
            revalidatePath('/admin/fiscal');

            return { success: true, message: 'Solicitação cancelada!' };
        } else {
            return {error: "Ocorreu um erro no processo de devolução."}
        }
    } catch (e) {
        console.error('Erro ao devolver solicitação!:', e);
        return { error: 'Ocorreu um erro ao devolver a solicitação.' };
    }
}
