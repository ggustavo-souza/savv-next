'use client'

import { FaPlus, FaTrash } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import FormCriarFuncionario from "./FormCriarFuncionario";
import ModalExcluirFuncionario from "./ModalExcluirFuncionario";
import { getFuncionarios } from "@/services/getFuncionarios";
import { FuncionarioSeguro } from "@/types/Funcionario";

export default function DiretorHomeBody() {

    const [showForm, setShowForm] = useState(false);
    const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState<FuncionarioSeguro | null>(null);
    const [funcionarios, setFuncionarios] = useState<FuncionarioSeguro[]>([]);
    const [carregando, setCarregando] = useState(true);

    const carregarFuncionarios = useCallback(async () => {
        try {
            setCarregando(true)
            const lista = await getFuncionarios()
            setFuncionarios(lista)
        } catch (e) {
            console.error('Erro ao carregar funcionários:', e)
        } finally {
            setCarregando(false)
        }
    }, [])

    useEffect(() => {
        carregarFuncionarios()
    }, [carregarFuncionarios])

    const formatarCargo = (cargo: string) => {
        const cargos: Record<string, string> = {
            diretor: 'Diretor',
            gerente: 'Gerente',
            fiscal: 'Fiscal',
        }
        return cargos[cargo] ?? cargo
    }

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
            <section className="mx-12">
                {carregando ? (
                    <p className="text-gray-500">Carregando funcionários...</p>
                ) : funcionarios.length === 0 ? (
                    <p className="text-gray-500">Nenhum funcionário cadastrado.</p>
                ) : (
                    <div className="flex-row gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {funcionarios.map((func) => (
                            <div key={func.idFuncionario} className="border-b gap-2 px-6 py-6 shadow-sm border-t border-t-gray-100 border-gray-200 hover:bg-gray-50 transition-colors w-full">
                                <div className="flex flex-row justify-between">
                                    <span className={`${func.cargo === "gerente" || func.cargo === "diretor" ? "bg-secundaria/10 text-secundaria" : "bg-blue-100 text-blue-900"} text-sm font-semibold px-3 py-1 rounded-md`}>
                                        {formatarCargo(func.cargo)}
                                    </span>
                                    <button
                                        className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-100"
                                        onClick={() => setFuncionarioParaExcluir(func)}
                                    ><FaTrash /></button>
                                </div>
                                <p className="mt-4 text-gray-600">{func.email}</p>
                                <h1 className="font-semibold text-xl">{func.nome}</h1>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {showForm && (
                <div className="z-50 fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/60" onClick={() => setShowForm(false)} />
                    <div className="relative z-10">
                        <FormCriarFuncionario
                            onClose={() => setShowForm(false)}
                            onSuccess={carregarFuncionarios}
                        />
                    </div>
                </div>
            )}
            {funcionarioParaExcluir && (
                <div className="z-50 fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/60" onClick={() => setFuncionarioParaExcluir(null)} />
                    <div className="relative z-10">
                        <ModalExcluirFuncionario
                            funcionario={funcionarioParaExcluir}
                            onClose={() => setFuncionarioParaExcluir(null)}
                            onSuccess={() => {
                                setFuncionarioParaExcluir(null);
                                carregarFuncionarios();
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
