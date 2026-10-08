'use client'

import { getSolicitacoesUsuario } from "@/services/getSolicitacoes";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SolicitacoesUsuarioProps {
    idUsuario: number;
    solicitacoes?: Awaited<ReturnType<typeof getSolicitacoesUsuario>>;
}


export default function SolicitacoesUsuario({ idUsuario }: SolicitacoesUsuarioProps) {

    const [solicitacoes, setSolicitacoes] = useState<Awaited<ReturnType<typeof getSolicitacoesUsuario>> | null>(null);

    useEffect(() => {
        const carregarSolicitacoes = async (offset: number = 0) => {
            const novasSolicitacoes = await getSolicitacoesUsuario(idUsuario, 5, offset);
            setSolicitacoes(novasSolicitacoes);
        };
        carregarSolicitacoes();
    }, [idUsuario]);

    return (
        <div>
            {solicitacoes && solicitacoes.length > 0 ? (
                <div className="space-y-4 flex flex-col">
                    {solicitacoes.map((solicitacao) => (
                        <div key={solicitacao.protocolo} className="border border-gray-200 flex p-4 flex-row">
                            <div className="flex flex-col w-full space-y-2 me-4">
                                <div className="flex flex-row w-full gap-3">
                                    <p className="px-3 py-1 bg-gray-500 text-white rounded-xs">#{solicitacao.protocolo}</p>
                                    <p className={`px-3 py-1 ${solicitacao.categoria === 'poda' || solicitacao.categoria === 'rocagem' ? 'bg-warning' : solicitacao.categoria === 'erradicacao' ? 'bg-error' : 'bg-secundaria'} font-semibold text-white rounded-xs`}>{solicitacao.categoria.toUpperCase()}</p>
                                    <p className={`px-3 py-1 ${solicitacao.status === 'concluida' ? 'bg-secundaria' : solicitacao.status === 'pendente' ? 'bg-warning' : 'bg-error'} text-white rounded-xs font-semibold`}>{solicitacao.status.toUpperCase()}</p>
                                </div>
                                <textarea readOnly value={solicitacao.observacao} className="w-full h-20 p-2 border rounded-md resize-none" />
                                <p>Endereço: {solicitacao.endereco}</p>
                            </div>
                            <Image className="object-cover rounded-xs" src={`/repository/${solicitacao.imagem}`} alt="Foto da solicitação" width={200} height={200} />
                        </div>
                    ))}
                    <button onClick={async () => {
                        const novasSolicitacoes = await getSolicitacoesUsuario(idUsuario, 5, solicitacoes.length);
                        if (novasSolicitacoes.length > 0) {
                            solicitacoes.push(...novasSolicitacoes);
                        }
                    }}>
                        Carregar mais
                    </button>
                </div>
            ) : (
                <p>Nenhuma solicitação encontrada.</p>
            )}
        </div>
    );
}