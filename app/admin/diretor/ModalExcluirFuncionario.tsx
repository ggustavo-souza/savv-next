'use client'

import { type FuncionarioSeguro } from "@/types/Funcionario"

interface ModalExcluirFuncionarioProps {
    funcionario: FuncionarioSeguro,
    onClose: () => void
    onSuccess: ()=> void
}

export default function ModalExcluirFuncionario({funcionario, onClose, onSuccess}: ModalExcluirFuncionarioProps) {
    return (
        <>
            <main className="flex flex-col justify-center items-center">
                <div className="bg-primaria p-8">
                    <h1>Deseja mesmo excluir o funcionário {funcionario.nome}?</h1>
                    <div className="flex flex-row">
                        <button className="bg-gray-500 text-primaria px-4 py-2 rounded-xs hover:brightness-90 cursor-pointer">Cancelar</button>
                        <button className="bg-red-600 text-primaria px-4 py-2 rounded-xs hover:brightness-90 cursor-pointer">Confirmar Exclusão</button>
                    </div>
                </div>
            </main>
        </>
    )
}