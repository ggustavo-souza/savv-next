import type { Metadata } from 'next'
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import ContainerMapaGerente from './ContainerMapaGerente';
import { getSolicitacoes, getContagemSolicitacoes } from '@/services/getSolicitacoes';
import { getBairrosComMaisSolicitacoes } from '@/services/getBairrosComMaisSolicitacoes';
import GraficoBarra from '@/components/GraficoBarra'
import { getDadosGerente } from '@/services/getDadosGrafico';
import { FaDownload } from 'react-icons/fa6';

export const metadata: Metadata = {
    title: 'SAVV - Gerente',
};

export default async function HomeGerente() {

    // autenticacao
    const auth = await checarAutenticacao();
    if (!auth || auth.cargo !== 'gerente') {
        redirect('/login/funcionario');
    }

    // marcadores
    const marcadores = await getSolicitacoes();

    //logica pras informações (contagem de denúncias e etc)
    //solicitações
    const totalSolicitacoes = await getContagemSolicitacoes();

    //dados pro gráfico
    const dadosGrafico = await getDadosGerente();

    // bairros com mais solicitações (top 3)
    const bairrosMaisSolicitados = await getBairrosComMaisSolicitacoes(3);

    return (
        <>
            <header className="flex flex-row mx-4 sm:mx-6 md:mx-8 lg:mx-12 my-8 sm:my-12 md:my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DE OPERAÇÕES</p>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl text-preta font-bold'>Monitoramento Ambiental</h1>
                </div>
            </header>
            <main>
                <header className='flex flex-row mx-4 sm:mx-6 md:mx-8 lg:mx-12 gap-4 sm:gap-6 p-2 mb-6 overflow-x-auto whitespace-nowrap text-sm sm:text-base'>
                    <p className="font-semibold text-gray-900 border-b-2 border-b-black cursor-pointer pb-1">ÍNDICE DE SOLICITAÇÕES</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100 pb-1">CONCLUÍDAS</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100 pb-1">EM ANDAMENTO</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100 pb-1">PENDENTES</p>
                </header>

                <section className='flex flex-col mx-4 sm:mx-6 md:mx-8 lg:mx-12 p-2'>
                    <div className='flex flex-col w-full lg:flex-row gap-6 lg:gap-10'>
                        <ContainerMapaGerente marcadores={marcadores} />

                        <div className='p-6 sm:p-8 border border-gray-300 w-full lg:w-1/2 flex flex-col justify-between gap-6'>
                            {/* informacoes das solicitações (total de solicitações do mês e bairros que mais aparecem nas solicitações) */}
                            <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
                                <p className="text-sm text-secundaria font-semibold">TOTAL DE SOLICITAÇÕES</p>
                                <h1 className='text-3xl sm:text-4xl md:text-5xl text-preta font-bold'>{totalSolicitacoes} Solicitações</h1>
                            </div>
                            <div className="flex flex-col gap-5 pt-2 sm:pt-6">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-secundaria font-semibold uppercase tracking-wider">Bairros com Mais Solicitações</p>
                                    <span className="text-xs text-gray-500 font-medium">Maior incidência</span>
                                </div>
                                {bairrosMaisSolicitados.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic">Nenhum bairro com solicitações registrado.</p>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {bairrosMaisSolicitados.map((item, index) => {
                                            const maiorIncidencia = bairrosMaisSolicitados[0]?.total || 1;
                                            const larguraProporcional = Math.max(Math.round((item.total / maiorIncidencia) * 100), 8);

                                            return (
                                                <div key={item.bairro} className="flex flex-col gap-1.5">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="font-semibold text-preta truncate max-w-[220px]">
                                                            {index + 1}º {item.bairro}
                                                        </span>
                                                        <span className="text-xs font-semibold text-gray-600">
                                                            {item.total} {item.total === 1 ? 'chamado' : 'chamados'} ({item.porcentagem}%)
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-md h-5 p-0.5 overflow-hidden flex items-center">
                                                        <div
                                                            className={`h-full rounded-sm transition-all duration-500 flex items-center justify-end pr-2 text-[11px] font-bold text-white ${
                                                                index === 0
                                                                    ? 'bg-secundaria'
                                                                    : index === 1
                                                                    ? 'bg-secundaria/85'
                                                                    : 'bg-secundaria/70'
                                                            }`}
                                                            style={{
                                                                width: `${larguraProporcional}%`,
                                                            }}
                                                        >
                                                            {larguraProporcional >= 25 && item.total}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row mt-6 sm:mt-8 gap-6 lg:gap-10 mb-8 sm:mb-12'>
                        <div className='w-full lg:w-1/2 min-h-64 sm:h-72 lg:h-80 rounded-sm py-4 border border-gray-300'>
                            {/* Gráfico de meses com mais solicitações */}
                            <GraficoBarra dadosGrafico={dadosGrafico} />
                        </div>

                        <div className='w-full lg:w-1/2 flex flex-col p-6 sm:p-8 md:p-12 border border-gray-300 justify-center gap-2'>
                            {/* Container com botão para gerar um relatório e baixá-lo automaticamente */}
                            <p className="text-sm italic text-gray-600">RELATÓRIO TÉCNICO</p>
                            <div className='flex flex-wrap items-center text-lg sm:text-xl gap-4'>
                                <p>Baixar Relatório do Semestre</p>
                                <button type="button" className='flex flex-row justify-content text-2xl sm:text-3xl cursor-pointer hover:scale-105 transition-transform duration-100'><FaDownload /></button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
