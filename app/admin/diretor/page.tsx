import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import DiretorHomeBody from './DiretorHomeBody';

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
            <DiretorHomeBody />
        </>
    );
}