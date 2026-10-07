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
            <h1>Solicitações do Usuário</h1>
            {solicitacoes && solicitacoes.length > 0 ? (
                <div>
                    {solicitacoes.map((solicitacao) => (
                        <div key={solicitacao.protocolo} className="border-b border-gray-200 py-4">
                            <p>Protocolo: {solicitacao.protocolo}</p>
                            <p>Status: {solicitacao.status}</p>
                            <Image src={`/repository/${solicitacao.imagem}`} alt="Foto da solicitação" width={200} height={200} />
                            <textarea readOnly value={solicitacao.observacao} className="w-full h-20 p-2 border rounded-md resize-none" />
                            <p>Categoria: {solicitacao.categoria}</p>
                            <p>Endereço: {solicitacao.endereco}</p>
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