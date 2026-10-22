'use client'

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SolicitacaoListagem } from '@/services/getSolicitacoes';
import { FaEye, FaFilter, FaCalendarAlt, FaMapPin, FaUser } from 'react-icons/fa';

type StatusFiltro = 'todas' | 'pendente' | 'em_analise' | 'devolvida' | 'concluida';

interface SolicitacoesGerenteBodyProps {
    solicitacoesIniciais: SolicitacaoListagem[];
}

export default function SolicitacoesGerenteBody({ solicitacoesIniciais }: SolicitacoesGerenteBodyProps) {
    const [filtro, setFiltro] = useState<StatusFiltro>('todas');

    const solicitacoesFiltradas = useMemo(() => {
        return solicitacoesIniciais.filter((sol) => {
            const matchesStatus = filtro === 'todas' ? true : sol.status === filtro;
            return matchesStatus;
        });
    }, [solicitacoesIniciais, filtro]);

    const formatarStatus = (status: string) => {
        const mapa: Record<string, { rotulo: string; classe: string }> = {
            pendente: { rotulo: 'PENDENTE', classe: 'bg-warning text-gray-900' },
            em_analise: { rotulo: 'EM ANDAMENTO', classe: 'bg-blue-600 text-white' },
            devolvida: { rotulo: 'DEVOLVIDA', classe: 'bg-orange-600 text-white' },
            concluida: { rotulo: 'CONCLUÍDA', classe: 'bg-secundaria text-white' },
            cancelada: { rotulo: 'CANCELADA', classe: 'bg-error text-white' },
        };
        return mapa[status] ?? { rotulo: status.toUpperCase(), classe: 'bg-gray-500 text-white' };
    };

    const formatarCategoria = (cat: string) => {
        const mapa: Record<string, string> = {
            poda: 'Poda',
            plantio: 'Plantio',
            erradicacao: 'Erradicação',
            rocagem: 'Roçagem',
        };
        return mapa[cat] ?? cat;
    };

    return (
        <>
            <header className="flex flex-row mx-6 md:mx-12 my-12 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DE OPERAÇÕES</p>
                    <h1 className="text-4xl md:text-5xl text-preta font-bold">Gestão de Solicitações</h1>
                </div>
            </header>

            <main className="mx-6 md:mx-12 pb-16">
                {/* Abas de filtro por status */}
                <header className="flex flex-wrap gap-4 md:gap-6 border-b border-gray-200 pb-3 mb-6">
                    <button
                        type="button"
                        onClick={() => setFiltro('todas')}
                        className={`font-semibold cursor-pointer pb-2 transition-all duration-100 ${
                            filtro === 'todas'
                                ? 'text-gray-900 border-b-2 border-b-black'
                                : 'text-gray-500 hover:brightness-75'
                        }`}
                    >
                        TODAS ({solicitacoesIniciais.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFiltro('pendente')}
                        className={`font-semibold cursor-pointer pb-2 transition-all duration-100 ${
                            filtro === 'pendente'
                                ? 'text-gray-900 border-b-2 border-b-black'
                                : 'text-gray-500 hover:brightness-75'
                        }`}
                    >
                        PENDENTES ({solicitacoesIniciais.filter((s) => s.status === 'pendente').length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFiltro('em_analise')}
                        className={`font-semibold cursor-pointer pb-2 transition-all duration-100 ${
                            filtro === 'em_analise'
                                ? 'text-gray-900 border-b-2 border-b-black'
                                : 'text-gray-500 hover:brightness-75'
                        }`}
                    >
                        EM ANDAMENTO ({solicitacoesIniciais.filter((s) => s.status === 'em_analise').length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFiltro('devolvida')}
                        className={`font-semibold cursor-pointer pb-2 transition-all duration-100 ${
                            filtro === 'devolvida'
                                ? 'text-gray-900 border-b-2 border-b-black'
                                : 'text-gray-500 hover:brightness-75'
                        }`}
                    >
                        DEVOLVIDAS ({solicitacoesIniciais.filter((s) => s.status === 'devolvida').length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFiltro('concluida')}
                        className={`font-semibold cursor-pointer pb-2 transition-all duration-100 ${
                            filtro === 'concluida'
                                ? 'text-gray-900 border-b-2 border-b-black'
                                : 'text-gray-500 hover:brightness-75'
                        }`}
                    >
                        CONCLUÍDAS ({solicitacoesIniciais.filter((s) => s.status === 'concluida').length})
                    </button>
                </header>
                {/* Lista de Solicitações */}
                <section>
                    {solicitacoesFiltradas.length === 0 ? (
                        <div className="bg-white p-12 text-center border border-gray-200 rounded-xs">
                            <p className="text-gray-500 text-base">Nenhuma solicitação encontrada com os filtros selecionados.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {solicitacoesFiltradas.map((sol) => {
                                const st = formatarStatus(sol.status);
                                return (
                                    <div
                                        key={sol.protocolo}
                                        className="bg-white border border-gray-200 rounded-xs p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                                    >
                                        {/* Imagem miniatura */}
                                        <div className="relative w-full md:w-36 h-28 shrink-0 bg-gray-100 rounded-xs overflow-hidden border border-gray-200">
                                            {sol.imagem ? (
                                                <Image
                                                    src={`/repository/${sol.imagem}`}
                                                    alt={`Solicitação #${sol.protocolo}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                    Sem foto
                                                </div>
                                            )}
                                        </div>

                                        {/* Informações centrais */}
                                        <div className="flex-1 flex flex-col gap-2 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-bold text-gray-700 bg-gray-100 text-xs px-2.5 py-1 rounded-xs">
                                                    #{sol.protocolo}
                                                </span>
                                                <span className={`text-xs px-2.5 py-1 rounded-xs font-semibold ${st.classe}`}>
                                                    {st.rotulo}
                                                </span>
                                                <span className={`text-xs px-2.5 py-1 rounded-xs font-medium border ${sol.categoria === "poda" || sol.categoria === "rocagem"  ? ("border-warning bg-warning/40 text-yellow-800") : sol.categoria === "erradicacao" ? "border-red-200 bg-red-50 text-red-800" : ("border-green-200 bg-green-50 text-secundaria")} `}>
                                                    {formatarCategoria(sol.categoria)}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-800 font-medium line-clamp-2">
                                                {sol.observacao}
                                            </p>

                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <FaMapPin className="text-secundaria" />
                                                    <span className="truncate max-w-xs">{sol.endereco}</span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaUser className="text-gray-400" />
                                                    <span>{sol.nomeUsuario}</span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="text-gray-400" />
                                                    <span>
                                                        {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(sol.data))}
                                                    </span>
                                                </span>
                                                {sol.nomeFiscal && (
                                                    <span className="text-blue-700 font-medium">
                                                        Fiscal: {sol.nomeFiscal}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Botão de direcionamento para visualização específica */}
                                        <div className="w-full md:w-auto shrink-0 flex items-center">
                                            <Link
                                                href={`/admin/gerente/solicitacoes/${sol.protocolo}`}
                                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-secundaria text-primaria font-semibold px-5 py-2.5 rounded-xs hover:brightness-125 transition-all cursor-pointer text-sm"
                                            >
                                                <FaEye />
                                                <span>Averiguar Detalhes</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
