'use client'

import { usuarios } from "@/lib/db/schema";
import FormFotoPerfil from "./FormFotoPerfil";
import { useState, useEffect, useMemo, useCallback } from "react";
import { getSolicitacoesUsuario } from "@/services/getSolicitacoes";
import { FaCalendarAlt, FaMapPin, FaLeaf, FaClipboardList } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import ModalLogOut from "@/components/ModalLogOut";

interface MinhaContaBodyProps {
    auth: {
        user: typeof usuarios.$inferSelect;
        cargo: string | null;
    };
}

type StatusFiltro = 'todas' | 'andamento' | 'concluidas';

export default function MinhaContaBody({ auth }: MinhaContaBodyProps) {
    const foto = auth?.user.foto && auth?.user.foto.trim() !== ''
        ? auth?.user.foto
        : 'Sem_imagem.jpg';

    const [filtro, setFiltro] = useState<StatusFiltro>('todas');
    const [solicitacoes, setSolicitacoes] = useState<Awaited<ReturnType<typeof getSolicitacoesUsuario>> | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [carregandoMais, setCarregandoMais] = useState(false);
    const [temMais, setTemMais] = useState(true);
    const [modalLogOutAberto, setModalLogOutAberto] = useState(false);

    useEffect(() => {
        const carregarSolicitacoes = async () => {
            setCarregando(true);
            const novasSolicitacoes = await getSolicitacoesUsuario(auth?.user.idUsuario, 5, 0);
            setSolicitacoes(novasSolicitacoes);
            setTemMais(novasSolicitacoes.length === 5);
            setCarregando(false);
        };
        carregarSolicitacoes();
    }, [auth?.user.idUsuario]);

    const carregarMais = useCallback(async () => {
        if (!solicitacoes || carregandoMais) return;
        setCarregandoMais(true);
        const novasSolicitacoes = await getSolicitacoesUsuario(auth?.user.idUsuario, 5, solicitacoes.length);
        if (novasSolicitacoes.length > 0) {
            setSolicitacoes(prev => prev ? [...prev, ...novasSolicitacoes] : novasSolicitacoes);
        }
        setTemMais(novasSolicitacoes.length === 5);
        setCarregandoMais(false);
    }, [solicitacoes, carregandoMais, auth?.user.idUsuario]);

    const solicitacoesFiltradas = useMemo(() => {
        if (!solicitacoes) return [];
        if (filtro === 'andamento') return solicitacoes.filter(s => s.status !== 'concluida');
        if (filtro === 'concluidas') return solicitacoes.filter(s => s.status === 'concluida');
        return solicitacoes;
    }, [solicitacoes, filtro]);

    const contagens = useMemo(() => {
        if (!solicitacoes) return { todas: 0, andamento: 0, concluidas: 0 };
        return {
            todas: solicitacoes.length,
            andamento: solicitacoes.filter(s => s.status !== 'concluida').length,
            concluidas: solicitacoes.filter(s => s.status === 'concluida').length,
        };
    }, [solicitacoes]);

    const formatarStatus = (status: string) => {
        const mapa: Record<string, { rotulo: string; classe: string }> = {
            pendente: { rotulo: 'Pendente', classe: 'bg-warning/15 text-yellow-800 border border-warning/40' },
            em_analise: { rotulo: 'Em Análise', classe: 'bg-blue-50 text-blue-700 border border-blue-200' },
            devolvida: { rotulo: 'Devolvida', classe: 'bg-orange-50 text-orange-700 border border-orange-200' },
            concluida: { rotulo: 'Concluída', classe: 'bg-green-50 text-green-700 border border-green-200' },
            cancelada: { rotulo: 'Cancelada', classe: 'bg-red-50 text-red-700 border border-red-200' },
        };
        return mapa[status] ?? { rotulo: status.toUpperCase(), classe: 'bg-gray-100 text-gray-600 border border-gray-200' };
    };

    const formatarCategoria = (cat: string) => {
        const mapa: Record<string, { rotulo: string; iconeClasse: string }> = {
            poda: { rotulo: 'Poda', iconeClasse: 'text-yellow-700 bg-warning/15' },
            plantio: { rotulo: 'Plantio', iconeClasse: 'text-green-700 bg-green-50' },
            erradicacao: { rotulo: 'Erradicação', iconeClasse: 'text-red-700 bg-red-50' },
            rocagem: { rotulo: 'Roçagem', iconeClasse: 'text-yellow-700 bg-warning/15' },
        };
        return mapa[cat] ?? { rotulo: cat, iconeClasse: 'text-gray-500' };
    };

    const abas: { chave: StatusFiltro; rotulo: string }[] = [
        { chave: 'todas', rotulo: 'TODAS' },
        { chave: 'andamento', rotulo: 'EM ANDAMENTO' },
        { chave: 'concluidas', rotulo: 'CONCLUÍDAS' },
    ];

    return (
        <>
            <main className="min-h-screen bg-primaria">
                <section className="border-b border-gray-200 bg-white">
                    <div className="max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-10">
                        <div className="flex flex-col gap-1 mb-10">
                            <p className="text-sm text-secundaria font-semibold tracking-wide">MINHA CONTA</p>
                            <h1 className="text-4xl md:text-5xl text-preta font-bold">Meu Perfil</h1>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                            <FormFotoPerfil
                                fotoAtual={foto}
                                nomeUsuario={auth?.user.nome}
                            />

                            <div className="flex flex-col flex-1 text-center sm:text-left gap-2">
                                <h2 className="text-2xl font-bold text-preta">{auth?.user.nome}</h2>
                                <p className="text-base text-gray-500">{auth?.user.email}</p>
                                <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-green-50 text-secundaria text-xs font-semibold rounded-full border border-green-200 w-fit self-center sm:self-start">
                                    Munícipe Cadastrado
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setModalLogOutAberto(true)}
                                className="flex items-center gap-2 font-medium px-5 py-2.5 text-sm rounded-xs border border-gray-300 text-primaria bg-secundaria transition-all hover:brightness-150 cursor-pointer self-center sm:self-start shrink-0"
                            >
                                <FiLogOut className="text-base" />
                                Sair da Conta
                            </button>
                        </div>
                    </div>
                </section>

                <section className="max-w-5xl mx-auto px-6 md:px-12 py-10">
                    <header className="flex flex-wrap gap-4 md:gap-6 border-b border-gray-200 pb-3 mb-8">
                        {abas.map(aba => (
                            <button
                                key={aba.chave}
                                type="button"
                                onClick={() => setFiltro(aba.chave)}
                                className={`font-semibold cursor-pointer pb-2 text-sm transition-all duration-100 ${
                                    filtro === aba.chave
                                        ? 'text-gray-900 border-b-2 border-b-black'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {aba.rotulo} ({contagens[aba.chave]})
                            </button>
                        ))}
                    </header>

                    {carregando ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-8 h-8 border-3 border-gray-200 border-t-secundaria rounded-full animate-spin" />
                            <p className="text-sm text-gray-400">Carregando solicitações...</p>
                        </div>
                    ) : solicitacoesFiltradas.length === 0 ? (
                        <div className="bg-white p-12 text-center border border-gray-200 rounded-xs">
                            <FaClipboardList className="text-4xl text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-base font-medium">
                                {filtro === 'todas'
                                    ? 'Você ainda não possui solicitações.'
                                    : filtro === 'andamento'
                                    ? 'Nenhuma solicitação em andamento.'
                                    : 'Nenhuma solicitação concluída.'}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Abra uma nova solicitação na página de serviços.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {solicitacoesFiltradas.map((solicitacao) => {
                                const st = formatarStatus(solicitacao.status);
                                const cat = formatarCategoria(solicitacao.categoria);
                                return (
                                    <div
                                        key={solicitacao.protocolo}
                                        className="bg-white border border-gray-200 rounded-xs p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-start md:items-center"
                                    >
                                        <div className="relative w-full md:w-36 h-28 shrink-0 bg-gray-100 rounded-xs overflow-hidden border border-gray-200">
                                            {solicitacao.imagem ? (
                                                <Image
                                                    src={`/repository/${solicitacao.imagem}`}
                                                    alt={`Solicitação #${solicitacao.protocolo}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                    Sem foto
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 flex flex-col gap-2 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-bold text-gray-700 bg-gray-100 text-xs px-2.5 py-1 rounded-xs">
                                                    #{solicitacao.protocolo}
                                                </span>
                                                <span className={`text-xs px-2.5 py-1 rounded-xs font-semibold ${st.classe}`}>
                                                    {st.rotulo}
                                                </span>
                                                <span className={`text-xs px-2.5 py-1 rounded-xs font-medium flex items-center gap-1 border border-gray-200 ${cat.iconeClasse}`}>
                                                    {cat.rotulo}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-800 font-medium line-clamp-2">
                                                {solicitacao.observacao}
                                            </p>

                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <FaMapPin className="text-secundaria" />
                                                    <span className="truncate max-w-xs">{solicitacao.endereco}</span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="text-gray-400" />
                                                    <span>
                                                        {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(solicitacao.data))}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {temMais && (
                                <button
                                    type="button"
                                    onClick={carregarMais}
                                    disabled={carregandoMais}
                                    className="mt-4 mx-auto flex items-center gap-2 text-sm font-semibold text-secundaria hover:text-green-800 cursor-pointer transition-colors disabled:opacity-50"
                                >
                                    {carregandoMais ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-gray-200 border-t-secundaria rounded-full animate-spin" />
                                            Carregando...
                                        </>
                                    ) : (
                                        'Carregar mais solicitações'
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </section>
            </main>
            {modalLogOutAberto && (
                <ModalLogOut onClose={() => setModalLogOutAberto(false)} />
            )}
        </>
    )
}
