'use client'

import Navbar from "@/src/components/Navbar";
import Link from "next/link";
import { loginAction } from "@/src/app/actions/login";
import { useActionState } from "react";

export default function Login() {

    const [state, formAction, estaPendente] = useActionState(loginAction, null);

    return (
        <>
            <Navbar tipo="visitante" />
            <main className="flex items-center justify-center flex-col ">
                {/* card login */}
                <div className="shadow-sm w-lg flex flex-col p-10 mt-16 mb-8 border-t-gray-200 border-t">
                    <div className="text-center flex flex-col gap-2">
                        <p className="text-sm text-secundaria">ACESSO AO SISTEMA</p>
                        <h2 className="text-2xl font-semibold">Entrar na sua conta</h2>
                    </div>

                    <form action={formAction} className="flex flex-col mt-4 py-4 pb-6 border-b border-b-secundaria">
                        <section className="flex gap-4 flex-col">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-gray-400 font-medium text-xs">ENDEREÇO DE EMAIL</label>
                                <input className="border border-gray-300 p-3 focus:outline-green-800 " type="text" name="email" placeholder="nome@exemplo.com" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="senha" className="text-gray-400 font-medium text-xs">SENHA</label>
                                <input className="border border-gray-300 p-3 focus:outline-green-800" type="password" name="senha" placeholder="*********" />
                            </div>
                        </section>

                        {state?.error && <p className="text-red-500">{state.error}</p>}
                        {state?.success && <p className="text-green-500">Login realizado com sucesso!</p>}

                        <div className="flex justify-center items-center">
                            <button disabled={estaPendente} className="px-4 py-3 w-3/4 mt-6 rounded-xs cursor-pointer hover:scale-105 transition-transform duration-100 bg-secundaria text-primaria font-semibold" type="submit">
                                {estaPendente ? 'Entrando...' : 'Entrar com sua conta'}
                            </button>
                        </div>
                    </form>
                    <span className="text-center mt-4">
                        <p>Não possui conta? <Link className="font-bold text-lg underline text-secundaria" href={"registrar"}>Registre-se agora.</Link></p>
                    </span>
                </div>
                <Link href={"admin/login"} className="text-md my-4 underline text-secundaria">Entrar como Funcionário</Link>
            </main>
        </>
    )
}