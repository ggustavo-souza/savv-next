import type { Metadata } from 'next'
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import ContainerMapaGerente from './ContainerMapaGerente';
import { getSolicitacoes } from '@/services/getSolicitacoes';

export const metadata: Metadata = {
    title: 'SAVV - Gerente',
};

export default async function HomeGerente() {

    const auth = await checarAutenticacao();

    const marcadores = await getSolicitacoes();

    if (!auth || auth.cargo !== 'gerente') {
        redirect('/login/funcionario');
    }

    return (
        <>
            <header className="flex flex-row mx-12 my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DE OPERAÇÕES</p>
                    <h1 className='text-5xl text-preta font-bold'>Monitoramento Ambiental</h1>
                </div>
            </header>
            <main>
                <header className='flex flex-row mx-12 border-b border-b-gray-300 gap-6 p-2'>
                    <p className="font-semibold text-gray-900 border-b-2 border-b-black cursor-pointer">ÍNDICE DE SOLICITAÇÕES</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">CONCLUÍDAS</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">EM ANDAMENTO</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">PENDENTES</p>
                </header>

                <section className='flex flex-col'>
                    <div className='flex flex-row'>
                        <ContainerMapaGerente marcadores={marcadores} />

                        <div>
                            {/* informacoes das solicitações (total de solicitações do mês e bairros que mais aparecem nas solicitações) */}
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div>
                            {/* Gráfico de meses com mais solicitações */}
                        </div>

                        <div>
                            {/* Container com botão para gerar um relatório e baixá-lo automaticamente */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}