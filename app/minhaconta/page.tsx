import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import MinhaContaBody from './MinhaContaBody';
import type { usuarios } from '@/lib/db/schema';

export const metadata: Metadata = {
    title: 'SAVV - Minha Conta',
};

export default async function MinhaConta() {
    const auth = await checarAutenticacao();

    if (!auth || auth.cargo) {
        redirect('/login/usuario');
    }
    
    const authUsuario = auth as { user: typeof usuarios.$inferSelect; cargo: string | null };

    return (
        <MinhaContaBody auth={authUsuario} />
    );
}