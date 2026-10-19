'use client'

import { criarFuncionarioAction } from "@/app/actions/crudFuncionario";
import { useActionState, useEffect } from "react";

import { IoClose } from "react-icons/io5";

interface FormCriarFuncionarioProps {
    onClose?: () => void;
    onSuccess?: () => void;
}

export default function FormCriarFuncionario({ onClose, onSuccess }: FormCriarFuncionarioProps) {
    const [state, formAction, estaPendente] = useActionState(criarFuncionarioAction, null);

    useEffect(() => {
        if (state?.success && onSuccess) {
            onSuccess()
        }
    }, [state, onSuccess])

    return (
        <main className="flex items-center justify-center flex-col">
            <div className="shadow-lg w-lg bg-primaria flex flex-col p-10 rounded-md relative">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
                        aria-label="Fechar"
                    >
                        <IoClose size={24} />
                    </button>
                )}
                <div className="text-center flex flex-col gap-2">
                    <p className="text-sm text-secundaria">CADASTRO DE FUNCIONÁRIO</p>
                    <h2 className="text-2xl font-semibold">Criar nova conta de funcionário</h2>
                </div>

                <form action={formAction} className="flex flex-col mt-4 py-4 pb-6">
                    <section className="flex gap-4 flex-col">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome" className="text-gray-400 font-medium text-xs">NOME DO FUNCIONÁRIO</label>
                            <input className="border border-gray-300 p-3 focus:outline-green-800 " type="text" name="nome" placeholder="Eng. Exemplo da Silva" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-gray-400 font-medium text-xs">ENDEREÇO DE EMAIL</label>
                            <input className="border border-gray-300 p-3 focus:outline-green-800 " type="text" name="email" placeholder="nome@exemplo.com" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="cargo" className="text-gray-400 font-medium text-xs">SELECIONE O CARGO</label>
                            <select name="cargo" className="border border-gray-300 p-3 focus:outline-green-800" >
                                <option value="gerente">Gerente</option>
                                <option value="fiscal">Fiscal</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="senha" className="text-gray-400 font-medium text-xs">SENHA</label>
                            <input className="border border-gray-300 p-3 focus:outline-green-800" type="password" name="senha" placeholder="*********" />
                        </div>
                    </section>

                    {state?.error && <p className="text-red-500">{state.error}</p>}
                    {state?.success && <p className="text-green-500">Cadastro realizado com sucesso!</p>}

                    <div className="flex justify-center items-center">
                        <button disabled={estaPendente} className="px-4 py-3 w-3/4 mt-6 rounded-xs cursor-pointer hover:scale-105 transition-transform duration-100 bg-secundaria text-primaria font-semibold" type="submit">
                            {estaPendente ? 'Cadastrando...' : 'Cadastrar novo funcionário'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}