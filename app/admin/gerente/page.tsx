import type { Metadata } from 'next'
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import ContainerMapaGerente from './ContainerMapaGerente';
import { getSolicitacoes, getContagemSolicitacoes } from '@/services/getSolicitacoes';
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

    return (
        <>
            <header className="flex flex-row mx-12 my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DE OPERAÇÕES</p>
                    <h1 className='text-5xl text-preta font-bold'>Monitoramento Ambiental</h1>
                </div>
            </header>
            <main>
                <header className='flex flex-row mx-12 gap-6 p-2 mb-6'>
                    <p className="font-semibold text-gray-900 border-b-2 border-b-black cursor-pointer">ÍNDICE DE SOLICITAÇÕES</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">CONCLUÍDAS</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">EM ANDAMENTO</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">PENDENTES</p>
                </header>

                <section className='flex flex-col mx-12 p-2'>
                    <div className='flex flex-row gap-10'>
                        <ContainerMapaGerente marcadores={marcadores} />

                        <div className='p-8 border border-gray-300 w-1/2'>
                            {/* informacoes das solicitações (total de solicitações do mês e bairros que mais aparecem nas solicitações) */}
                            <div className="flex flex-col gap-4 border-b border-gray-300 pb-10">
                                <p className="text-sm text-secundaria font-semibold">TOTAL DE SOLICITAÇÕES</p>
                                <h1 className='text-5xl text-preta font-bold'>{totalSolicitacoes} Solicitações</h1>
                            </div>
                            <div>
                                puxar bairros
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row mt-8 gap-10'>
                        <div className='w-1/2 h-50 sm:h-60 rounded-sm py-4 border border-gray-300'>
                            {/* Gráfico de meses com mais solicitações */}
                            <GraficoBarra dadosGrafico={dadosGrafico} />
                        </div>

                        <div className='w-1/2 flex flex-col p-12 border border-gray-300 justify-center'>
                            {/* Container com botão para gerar um relatório e baixá-lo automaticamente */}
                            <p className="text-sm italic text-gray-600">RELATÓRIO TÉCNICO</p>
                            <div className='flex flex-row items-center text-xl gap-4'>
                                <p>Baixar Relatório do Semestre</p>
                                <button type="button" className='flex flex-row justify-content text-3xl cursor-pointer'><FaDownload /></button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
