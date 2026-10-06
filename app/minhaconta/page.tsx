import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import FormFotoPerfil from './FormFotoPerfil';
import BotaoConfiguracoesConta from './BotaoConfiguracoesConta';

export const metadata: Metadata = {
    title: 'SAVV - Minha Conta',
};

export default async function MinhaConta() {
    const auth = await checarAutenticacao();

    if (!auth) {
        redirect('/login');
    }

    const foto = auth.user.foto && auth.user.foto.trim() !== ''
        ? auth.user.foto
        : 'Sem_Imagem.jpg';

    return (
        <main className="min-h-screen py-10 px-4 bg-primaria">
            <section className="max-w-5xl mx-auto">
                <div className="bg-white p-6 md:p-8 rounded-xs shadow-sm border border-gray-200 flex flex-col gap-8">
                    <header className="flex flex-col sm:flex-row">
                        <FormFotoPerfil
                            fotoAtual={foto}
                            nomeUsuario={auth.user.nome}
                        />

                        <div className="flex flex-col text-center sm:text-left gap-1 mt-2">
                            <h2 className="text-2xl font-bold text-preta">{auth.user.nome}</h2>
                            <p className="text-gray-500 font-medium">{auth.user.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-secundaria text-xs font-semibold rounded-full border border-green-200 w-fit self-center sm:self-start">
                                Munícipe Cadastrado
                            </span>
                        </div>

                        <BotaoConfiguracoesConta />
                    </header>
                </div>
            </section>
        </main>
    );
}