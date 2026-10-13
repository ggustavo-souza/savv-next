import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import MinhaContaBody from './MinhaContaBody';

export const metadata: Metadata = {
    title: 'SAVV - Minha Conta',
};

export default async function MinhaConta() {
    const auth = await checarAutenticacao();

    if (!auth) {
        redirect('/login/usuario');
    }
    
    return (
        <MinhaContaBody auth={auth} />
    );
}