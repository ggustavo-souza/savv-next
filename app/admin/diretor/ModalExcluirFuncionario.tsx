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
                <form action={formAction} className="bg-primaria p-8">
                    <h1>Deseja mesmo excluir o funcionário {funcionario.nome}?</h1>
                    <input className="" hidden={true} readOnly={true} value={funcionario.email} name="email" />
                    {state?.error && <p className="text-red-500">{state.error}</p>}
                    {state?.success && <p className="text-green-500">Exclusão realizada com sucesso!</p>}
                    <div className="flex flex-row">
                        <button
                            className="bg-gray-500 text-primaria px-4 py-2 rounded-xs hover:brightness-90 cursor-pointer"
                            onClick={() => onClose()}
                        >Cancelar</button>
                        <button
                            className="bg-red-600 text-primaria px-4 py-2 rounded-xs hover:brightness-90 cursor-pointer"
                            type="submit"
                            disabled={estaPendente}
                        >{estaPendente ? 'Excluindo...' : 'Confirmar Exclusão'}</button>
                    </div>
                </form>
            </main>
        </>
    )
}