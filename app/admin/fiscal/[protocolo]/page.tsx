import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import { getSolicitacaoPorProtocolo } from '@/services/getSolicitacoes';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaMapPin, FaUser, FaClock, FaTag } from 'react-icons/fa6';
import ContainerMapaDetalhes from '@/app/admin/gerente/solicitacoes/[protocolo]/ContainerMapaDetalhes';
import FormDevolverSolicitacao from './FormDevolverSolicitacao';

export const metadata: Metadata = {
    title: 'SAVV - Detalhes da Solicitação',
};

interface PaginaDetalhesProps {
    params: Promise<{
        protocolo: string;
    }>;
}

export default async function DetalhesSolicitacaoPage({ params }: PaginaDetalhesProps) {
    const auth = await checarAutenticacao();
    if (!auth || auth.cargo !== 'fiscal') {
        redirect('/login/funcionario');
    }

    const { protocolo: protocoloStr } = await params;
    const protocolo = parseInt(protocoloStr, 10);

    if (isNaN(protocolo)) {
        notFound();
    }

    const solicitacao = await getSolicitacaoPorProtocolo(protocolo);
    if (!solicitacao) {
        notFound();
    }

    const formatarStatus = (status: string) => {
        const mapa: Record<string, { rotulo: string; cor: string }> = {
            pendente: { rotulo: 'PENDENTE', cor: 'bg-warning text-gray-900' },
            em_analise: { rotulo: 'EM ANDAMENTO (EM ANÁLISE)', cor: 'bg-blue-600 text-white' },
            devolvida: { rotulo: 'DEVOLVIDA', cor: 'bg-orange-600 text-white' },
            concluida: { rotulo: 'CONCLUÍDA', cor: 'bg-secundaria text-white' },
            cancelada: { rotulo: 'CANCELADA', cor: 'bg-error text-white' },
        };
        return mapa[status] ?? { rotulo: status.toUpperCase(), cor: 'bg-gray-500 text-white' };
    };

    const formatarCategoria = (cat: string) => {
        const mapa: Record<string, string> = {
            poda: 'Poda de Árvore',
            plantio: 'Plantio de Muda',
            erradicacao: 'Erradicação (Remoção)',
            rocagem: 'Roçagem de Terreno',
        };
        return mapa[cat] ?? cat;
    };

    const statusInfo = formatarStatus(solicitacao.status);
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long',
        timeStyle: 'short',
    }).format(new Date(solicitacao.data));

    return (
        <div className="min-h-screen bg-primaria pb-16">
            <header className="flex flex-col mx-6 md:mx-12 my-10 gap-4">
                <Link
                    href="/admin/fiscal"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-secundaria transition-colors w-fit"
                >
                    <FaArrowLeft /> Voltar para lista de solicitações
                </Link>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-gray-200 pb-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-secundaria font-semibold tracking-wider">
                            DETALHAMENTO DA SOLICITAÇÃO
                        </p>
                        <h1 className="text-3xl md:text-4xl text-preta font-bold">
                            Chamado #{solicitacao.protocolo}
                        </h1>
                    </div>
                    <div>
                        <span className={`px-4 py-2 rounded-xs font-bold text-xs tracking-wider uppercase ${statusInfo.cor}`}>
                            {statusInfo.rotulo}
                        </span>
                    </div>
                </div>
            </header>

            <main className="mx-6 md:mx-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna principal com informações e foto */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Integridade da solicitação */}
                    <div className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-preta border-b border-gray-100 pb-2">
                            Averiguação e Dados Gerais
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3">
                                <FaTag className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold">CATEGORIA</p>
                                    <p className="font-semibold text-preta">{formatarCategoria(solicitacao.categoria)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaClock className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold">DATA E HORA DO REQUISITO</p>
                                    <p className="font-semibold text-preta">{dataFormatada}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaUser className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold">MUNÍCIPE SOLICITANTE</p>
                                    <p className="font-semibold text-preta">{solicitacao.nomeUsuario}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaUser className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold">FISCAL RESPONSÁVEL</p>
                                    <p className="font-semibold text-preta">
                                        {solicitacao.nomeFiscal ? solicitacao.nomeFiscal : 'Não atribuído ainda'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <p className="text-xs font-semibold text-gray-500 mb-1">ENDEREÇO INFORMADO</p>
                            <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-xs border border-gray-200 text-sm">
                                <FaMapPin className="text-secundaria shrink-0 mt-0.5" />
                                <span>{solicitacao.endereco}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1">RELATO DO MUNÍCIPE (OBSERVAÇÃO)</p>
                            <div className="bg-gray-50 p-4 rounded-xs border border-gray-200 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                                {solicitacao.observacao}
                            </div>
                        </div>
                    </div>

                    {/* Evidência Fotográfica */}
                    <div className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm flex flex-col gap-3">
                        <h2 className="text-lg font-bold text-preta border-b border-gray-100 pb-2">
                            Evidência Fotográfica Anexada
                        </h2>
                        <div className="relative w-full h-80 sm:h-96 bg-gray-100 rounded-xs overflow-hidden border border-gray-200 flex items-center justify-center">
                            {solicitacao.imagem ? (
                                <Image
                                    src={`/repository/${solicitacao.imagem}`}
                                    alt={`Foto de evidência da solicitação #${solicitacao.protocolo}`}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <p className="text-gray-400 text-sm">Nenhuma imagem enviada</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Coluna lateral: Ações de Triagem + Mapa */}
                <div className="flex flex-col gap-6">
                    {/* Card de Atribuição de Fiscal */}
                    <div className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm flex flex-col gap-4">
                        <FormDevolverSolicitacao protocolo={solicitacao.protocolo}/>
                    </div>

                    {/* Localização Geográfica */}
                    <div className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm flex flex-col gap-3">
                        <h2 className="text-lg font-bold text-preta border-b border-gray-100 pb-2">
                            Localização Marcada
                        </h2>
                        <p className="text-xs text-gray-500">
                            Lat: {solicitacao.lat.toFixed(5)} | Lng: {solicitacao.lng.toFixed(5)}
                        </p>
                        <ContainerMapaDetalhes lat={solicitacao.lat} lng={solicitacao.lng} />
                    </div>
                </div>
            </main>
        </div>
    );
}
