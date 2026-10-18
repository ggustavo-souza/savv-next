'use client'

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import FormCriarFuncionario from "./FormCriarFuncionario";

export default function DiretorHomeBody() {

    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <header className="flex flex-row mx-12 my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DO DIRETOR</p>
                    <h1 className='text-5xl text-preta font-bold'>Gerenciar Funcionários</h1>
                </div>
                <button
                    className="flex flex-row  items-center bg-secundaria px-3 py-4 text-lg text-primaria font-semibold hover:brightness-125 cursor-pointer rounded-xs"
                    onClick={() => setShowForm(!showForm)}
                >
                    <FaPlus className="mx-2" />
                    Adicionar Funcionário
                </button>
            </header>
            {showForm && (
                <div className="z-50 fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/60" onClick={() => setShowForm(false)} />
                    <div className="relative z-10">
                        <FormCriarFuncionario onClose={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </>
    )
}