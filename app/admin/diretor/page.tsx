import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import { FaPlus } from 'react-icons/fa6';

export const metadata: Metadata = {
    title: 'SAVV - Diretor',
};

export default async function HomeDiretor() {
    const auth = await checarAutenticacao();

    if (!auth || auth.cargo !== 'diretor') {
        redirect('/login/funcionario');
    }

    return (
        <>
            <header className="flex flex-row mx-12 my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DO DIRETOR</p>
                    <h1 className='text-5xl text-preta font-bold'>Gerenciar Funcionários</h1>
                </div>
                <button className="flex flex-row  items-center bg-secundaria px-3 py-4 text-lg text-primaria font-semibold hover:brightness-125 cursor-pointer rounded-xs">
                    <FaPlus className="mx-2" />
                    Adicionar Funcionário
                </button>
            </header>
        </>
    );
}