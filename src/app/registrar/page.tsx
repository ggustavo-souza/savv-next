'use client'

import Link from "next/link";
import { registerAction } from "@/src/app/actions/registrar";
import { useActionState } from "react";

export default function Registrar() {
    const [state, formAction, estaPendente] = useActionState(registerAction, null);

    return (
        <>
            <main className="flex items-center justify-center flex-col px-4">
                <div className="shadow-sm w-full max-w-lg flex flex-col p-10 mt-12 mb-8 border-t-gray-200 border-t bg-primaria">
                    <div className="text-center flex flex-col gap-2">
                        <p className="text-sm text-secundaria font-semibold">CADASTRO DE CIDADÃO</p>
                        <h2 className="text-2xl font-semibold">Crie sua conta</h2>
                    </div>

                    <form action={formAction} className="flex flex-col mt-4 py-4 pb-6 border-b border-b-secundaria">
                        <section className="flex gap-4 flex-col">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nome" className="text-gray-400 font-medium text-xs">NOME DE USUÁRIO</label>
                                <input
                                    id="nome"
                                    className="border border-gray-300 p-3 focus:outline-green-800"
                                    type="text"
                                    name="nome"
                                    placeholder="Seu nome completo"
                                    maxLength={50}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-gray-400 font-medium text-xs">ENDEREÇO DE EMAIL</label>
                                <input
                                    id="email"
                                    className="border border-gray-300 p-3 focus:outline-green-800"
                                    type="email"
                                    name="email"
                                    placeholder="nome@exemplo.com"
                                    maxLength={150}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="senha" className="text-gray-400 font-medium text-xs">SENHA</label>
                                <input
                                    id="senha"
                                    className="border border-gray-300 p-3 focus:outline-green-800"
                                    type="password"
                                    name="senha"
                                    placeholder="*********"
                                    minLength={6}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmarSenha" className="text-gray-400 font-medium text-xs">CONFIRMAR SENHA</label>
                                <input
                                    id="confirmarSenha"
                                    className="border border-gray-300 p-3 focus:outline-green-800"
                                    type="password"
                                    name="confirmarSenha"
                                    placeholder="*********"
                                    minLength={6}
                                    required
                                />
                            </div>
                        </section>

                        {state?.error && <p className="text-red-500 text-sm mt-3">{state.error}</p>}

                        <div className="flex justify-center items-center">
                            <button
                                disabled={estaPendente}
                                className="px-4 py-3 w-3/4 mt-6 rounded-xs cursor-pointer hover:scale-105 transition-transform duration-100 bg-secundaria text-primaria font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                            >
                                {estaPendente ? 'Cadastrando...' : 'Criar conta'}
                            </button>
                        </div>
                    </form>

                    <span className="text-center mt-4">
                        <p>Já possui conta? <Link className="font-bold text-lg underline text-secundaria" href="/login">Entre agora.</Link></p>
                    </span>
                </div>
            </main>
        </>
    )
}