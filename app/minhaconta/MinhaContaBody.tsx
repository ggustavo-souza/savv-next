'use client'

import { usuarios } from "@/lib/db/schema";
import FormFotoPerfil from "./FormFotoPerfil";
import { useState, useEffect } from "react";
import { getSolicitacoesUsuario } from "@/services/getSolicitacoes";
import { FaAngleDown } from "react-icons/fa6";
import Image from "next/image";

interface MinhaContaBodyProps {
    auth: {
        user: typeof usuarios.$inferSelect;
        cargo: string | null;
    };
}

export default function MinhaContaBody({ auth }: MinhaContaBodyProps) {
    // logica da autenticação e do filtro
    const foto = auth?.user.foto && auth?.user.foto.trim() !== ''
        ? auth?.user.foto
        : 'Sem_imagem.jpg';

    const [opcoesFiltro, setOpcoesFiltro] = useState({
        todas: true,
        andamento: false,
        concluidas: false
    });
    const [janelaFiltro, setJanelaFiltro] = useState(false);

    // logica de carregamento das solicitações do usuário
    const [solicitacoes, setSolicitacoes] = useState<Awaited<ReturnType<typeof getSolicitacoesUsuario>> | null>(null);

    useEffect(() => {
        const carregarSolicitacoes = async (offset: number = 0) => {
            const novasSolicitacoes = await getSolicitacoesUsuario(auth?.user.idUsuario, 5, offset);
            setSolicitacoes(novasSolicitacoes);
        };
        carregarSolicitacoes();
    }, [auth?.user.idUsuario]);

    return (
        <>
            <main className="min-h-screen py-10 px-4 bg-primaria">
                <section className="justify-center items-center flex flex-col gap-8">
                    <div className="max-w-3xl bg-white p-6 md:p-8 rounded-xs shadow-sm border border-gray-200 flex flex-col gap-8">
                        <header className="flex flex-col sm:flex-row items-center sm:items-start pb-6 border-gray-100 ">
                            <FormFotoPerfil
                                fotoAtual={foto}
                                nomeUsuario={auth?.user.nome}
                            />

                            <div className="flex self-start flex-col text-center sm:text-left gap-1 mt-2">
                                <h2 className="text-2xl font-bold text-preta">{auth?.user.nome}</h2>
                                <p className="text-xl font-medium text-gray-600">{auth?.user.email}</p>
                                <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-secundaria text-xs font-semibold rounded-full border border-green-200 w-fit self-center sm:self-start">
                                    Munícipe Cadastrado
                                </span>
                            </div>
                        </header>
                    </div>
                    <section>
                        <div className="flex flex-row min-w-sm sm:min-w-3xl justify-between items-center mb-6 border-b border-gray-300">
                            <h2 className="sm:text-lg text-sm font-bold text-gray-500">MINHAS SOLICITAÇÕES</h2>
                            <div className="flex flex-row gap-3 text-gray-500 text-sm font-semibold">
                                <button className="flex flex-row items-center gap-1 cursor-pointer hover:font-semibold hover:brightness-50 transition-all duration-200" onClick={() => setJanelaFiltro(!janelaFiltro)}>
                                    {opcoesFiltro.todas ? 'Todas' : opcoesFiltro.andamento ? 'Em andamento' : 'Concluídas'} <FaAngleDown />
                                </button>
                                {janelaFiltro && (
                                    <div className="absolute mt-2 bg-white border border-gray-300 rounded-xs shadow-md z-10">
                                        <button className={`block ${opcoesFiltro.todas ? 'bg-secundaria text-primaria' : 'hover:bg-gray-100'} w-full text-left px-4 py-2`} onClick={() => { setOpcoesFiltro({ todas: true, andamento: false, concluidas: false }); setJanelaFiltro(false) }}>Todas</button>
                                        <button className={`block ${opcoesFiltro.andamento ? 'bg-secundaria text-primaria' : 'hover:bg-gray-100'} w-full text-left px-4 py-2`} onClick={() => { setOpcoesFiltro({ todas: false, andamento: true, concluidas: false }); setJanelaFiltro(false) }}>Em andamento</button>
                                        <button className={`block ${opcoesFiltro.concluidas ? 'bg-secundaria text-primaria' : 'hover:bg-gray-100'} w-full text-left px-4 py-2`} onClick={() => { setOpcoesFiltro({ todas: false, andamento: false, concluidas: true }); setJanelaFiltro(false) }}>Concluídas</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            {solicitacoes && solicitacoes.length > 0 ? (
                                <div className="space-y-4 flex flex-col">
                                    {opcoesFiltro.todas ? (
                                        solicitacoes.map((solicitacao) => (
                                            <div key={solicitacao.protocolo} className="shadow-md border-t border-gray-100 flex p-4 flex-col sm:flex-row">
                                                <div className="flex flex-col w-full space-y-2 me-4">
                                                    <div className="flex flex-row w-full gap-3">
                                                        <p className="px-3 py-1 bg-gray-500 text-white rounded-xs">#{solicitacao.protocolo}</p>
                                                        <p className={`px-3 py-1 ${solicitacao.categoria === 'poda' || solicitacao.categoria === 'rocagem' ? 'bg-warning' : solicitacao.categoria === 'erradicacao' ? 'bg-error' : 'bg-secundaria'} font-semibold text-white rounded-xs`}>{solicitacao.categoria.toUpperCase()}</p>
                                                        <p className={`px-3 py-1 ${solicitacao.status === 'concluida' ? 'bg-secundaria' : solicitacao.status === 'pendente' ? 'bg-warning' : 'bg-error'} text-white rounded-xs font-semibold`}>{solicitacao.status.toUpperCase()}</p>
                                                    </div>
                                                    <textarea readOnly value={solicitacao.observacao} className="w-full h-20 p-2 border border-gray-300 rounded-xs resize-none" />
                                                </div>
                                                <Image className="object-cover rounded-xs" src={`/repository/${solicitacao.imagem}`} alt="Foto da solicitação" width={200} height={200} />
                                            </div>
                                        ))) : opcoesFiltro.andamento ? (
                                            solicitacoes.filter(solicitacao => solicitacao.status !== 'concluida').map((solicitacao) => (
                                                <div key={solicitacao.protocolo} className="shadow-md border-t border-gray-100 flex p-4 flex-col sm:flex-row">
                                                    <div className="flex flex-col w-full space-y-2 me-4">
                                                        <div className="flex flex-row w-full gap-3">
                                                            <p className="px-3 py-1 bg-gray-500 text-white rounded-xs">#{solicitacao.protocolo}</p>
                                                            <p className={`px-3 py-1 ${solicitacao.categoria === 'poda' || solicitacao.categoria === 'rocagem' ? 'bg-warning' : solicitacao.categoria === 'erradicacao' ? 'bg-error' : 'bg-secundaria'} font-semibold text-white rounded-xs`}>{solicitacao.categoria.toUpperCase()}</p>
                                                            <p className={`px-3 py-1 ${solicitacao.status === 'concluida' ? 'bg-secundaria' : solicitacao.status === 'pendente' ? 'bg-warning' : 'bg-error'} text-white rounded-xs font-semibold`}>{solicitacao.status.toUpperCase()}</p>
                                                        </div>
                                                        <textarea readOnly value={solicitacao.observacao} className="w-full h-20 p-2 border border-gray-300 rounded-xs resize-none" />
                                                    </div>
                                                    <Image className="object-cover rounded-xs" src={`/repository/${solicitacao.imagem}`} alt="Foto da solicitação" width={200} height={200} />
                                                </div>
                                            ))
                                        ) : (
                                        solicitacoes.filter(solicitacao => solicitacao.status === 'concluida').map((solicitacao) => (
                                            <div key={solicitacao.protocolo} className="shadow-md border-t border-gray-100 flex p-4 flex-col sm:flex-row">
                                                <div className="flex flex-col w-full space-y-2 me-4">
                                                    <div className="flex flex-row w-full gap-3">
                                                        <p className="px-3 py-1 bg-gray-500 text-white rounded-xs">#{solicitacao.protocolo}</p>
                                                        <p className={`px-3 py-1 ${solicitacao.categoria === 'poda' || solicitacao.categoria === 'rocagem' ? 'bg-warning' : solicitacao.categoria === 'erradicacao' ? 'bg-error' : 'bg-secundaria'} font-semibold text-white rounded-xs`}>{solicitacao.categoria.toUpperCase()}</p>
                                                        <p className={`px-3 py-1 ${solicitacao.status === 'concluida' ? 'bg-secundaria' : solicitacao.status === 'pendente' ? 'bg-warning' : 'bg-error'} text-white rounded-xs font-semibold`}>{solicitacao.status.toUpperCase()}</p>
                                                    </div>
                                                    <textarea readOnly value={solicitacao.observacao} className="w-full h-20 p-2 border border-gray-300 rounded-xs resize-none" />
                                                </div>
                                                <Image className="object-cover rounded-xs" src={`/repository/${solicitacao.imagem}`} alt="Foto da solicitação" width={200} height={200} />
                                            </div>
                                        ))
                                    )}
                                    <button onClick={async () => {
                                        const novasSolicitacoes = await getSolicitacoesUsuario(auth?.user.idUsuario, 5, solicitacoes.length);
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
                    </section>
                </section>
            </main>
        </>
    )
}