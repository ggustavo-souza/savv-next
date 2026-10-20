'use client'

import { deletarFuncionarioAction } from "@/app/actions/crudFuncionario"
import { type FuncionarioSeguro } from "@/types/Funcionario"
import { useActionState, useEffect } from "react"

interface ModalExcluirFuncionarioProps {
    funcionario: FuncionarioSeguro,
    onClose: () => void
    onSuccess: () => void
}

export default function ModalExcluirFuncionario({ funcionario, onClose, onSuccess }: ModalExcluirFuncionarioProps) {

    const [state, formAction, estaPendente] = useActionState(deletarFuncionarioAction, null);

    useEffect(() => {
        if (state?.success && onSuccess) {
            onSuccess()
        }
    }, [state, onSuccess])

    return (
        <>
            <main className="flex flex-col justify-center items-center">
                <form action={formAction} className="bg-primaria p-8 px-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-preta">Confirmação de Exclusão</h2>
                    <p className="text-sm text-gray-600 mt-1">Deseja mesmo excluir o funcionário <b>{funcionario.nome}</b>?</p>
                    <input className="" hidden={true} readOnly={true} value={funcionario.email} name="email" />
                    {state?.error && <p className="text-red-500">{state.error}</p>}
                    {state?.success && <p className="text-green-500">Exclusão realizada com sucesso!</p>}
                    <div className="flex flex-row justify-between gap-3 mt-8">
                        <button
                            className="bg-gray-500 text-primaria px-4 py-2 w-1/2 rounded-xs hover:brightness-90 cursor-pointer transition-all disabled:opacity-50 font-medium text-sm"
                            onClick={() => onClose()}
                        >Cancelar</button>
                        <button
                            className="bg-red-600 text-primaria px-5 py-2 w-full rounded-xs hover:brightness-90 cursor-pointer transition-all disabled:opacity-50 font-semibold text-md flex items-center justify-center min-w-24"
                            type="submit"
                            disabled={estaPendente}
                        >{estaPendente ? 'Excluindo...' : 'Confirmar Exclusão'}</button>
                    </div>
                </form>
            </main>
        </>
    )
}