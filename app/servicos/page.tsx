import type { Metadata } from "next"
import { redirect } from 'next/navigation'
import { checarAutenticacao } from '@/services/AuthCheck'
import FormServico from './FormServico'

export const metadata: Metadata = {
    title: "SAVV - Nova Solicitação"
}

export default async function Servico() {
    const auth = await checarAutenticacao();

    if (!auth) {
        redirect('/login');
    }

    return (
        <main className="min-h-screen py-10 px-4">
            <section className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <p className="text-secundaria text-xs font-semibold">SERVICOS</p>
                    <h1 className="text-5xl font-bold">Nova Solicitação</h1>
                    <p className="text-gray-600 mt-2">
                        Preencha os dados corretamente para registrar sua solicitação no sistema.
                    </p>
                </div>
                
                <FormServico />
            </section>
        </main>
    )
}