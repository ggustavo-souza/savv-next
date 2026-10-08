import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import FormFotoPerfil from './FormFotoPerfil';
import SolicitacoesUsuario from './SolicitacoesUsuario';

export const metadata: Metadata = {
    title: 'SAVV - Minha Conta',
};

export default async function MinhaConta() {
    const auth = await checarAutenticacao();

    if (!auth) {
        redirect('/login/usuario');
    }

    const foto = auth.user.foto && auth.user.foto.trim() !== ''
        ? auth.user.foto
        : 'Sem_imagem.jpg';

    return (
        <main className="min-h-screen py-10 px-4 bg-primaria">
            <section className="justify-center items-center flex flex-col gap-8">
                <div className="max-w-3xl bg-white p-6 md:p-8 rounded-xs shadow-sm border border-gray-200 flex flex-col gap-8">
                    <header className="flex flex-col sm:flex-row items-center sm:items-start pb-6 border-gray-100 ">
                        <FormFotoPerfil
                            fotoAtual={foto}
                            nomeUsuario={auth.user.nome}
                        />

                        <div className="flex self-start flex-col text-center sm:text-left gap-1 mt-2">
                            <h2 className="text-2xl font-bold text-preta">{auth.user.nome}</h2>
                            <p className="text-xl font-medium text-gray-600">{auth.user.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-secundaria text-xs font-semibold rounded-full border border-green-200 w-fit self-center sm:self-start">
                                Munícipe Cadastrado
                            </span>
                        </div>
                    </header>
                </div>
                <section>
                    <div className="flex flex-row w-full justify-between items-center mb-6 border-b border-gray-300">
                        <h2 className="text-lg font-bold text-gray-500">MINHAS SOLICITAÇÕES</h2>
                        <div className="flex flex-row gap-3 text-gray-500">
                            <button>Todas</button>
                            <button>Em andamento</button>
                            <button>Concluídas</button>
                        </div>
                    </div>
                    <SolicitacoesUsuario idUsuario={auth.user.idUsuario} />
                </section>
            </section>
        </main>
    );
}