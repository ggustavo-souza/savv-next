import { Metadata } from "next"
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';

export const metadata: Metadata = {
    title: "SAVV - Fiscal"
}

export default async function HomeFiscal() {

    const auth = await checarAutenticacao();

    if (!auth || auth.cargo !== 'fiscal') {
        redirect('/login/funcionario');
    }

    return (
        <>
            <header className="flex flex-row mx-12 my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DO FISCAL</p>
                    <h1 className='text-5xl text-preta font-bold'>Gestão de Tarefas</h1>
                </div>
            </header>
            <main>
                <header className='flex flex-row mx-12 gap-6 p-2'>
                    <p className="font-semibold text-gray-900 border-b-2 border-b-black cursor-pointer">TODAS</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">AGUARDANDO VISITA</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">AGUARDANDO RELATÓRIO</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">CONCLUÍDAS</p>
                </header>
            </main>
        </>
    )
}