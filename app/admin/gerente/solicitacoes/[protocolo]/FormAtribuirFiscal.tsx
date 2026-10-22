'use client'

import { useActionState, useState } from "react";
import { atribuirFiscalAction } from "@/app/actions/atribuirFiscal";
import { FuncionarioSeguro } from "@/types/Funcionario";
import { FaUserCheck } from "react-icons/fa6";

interface FormAtribuirFiscalProps {
    protocolo: number;
    idFiscalAtual: number | null;
    fiscais: FuncionarioSeguro[];
}

export default function FormAtribuirFiscal({
    protocolo,
    idFiscalAtual,
    fiscais,
}: FormAtribuirFiscalProps) {
    const [state, formAction, isPending] = useActionState(atribuirFiscalAction, null);
    const [fiscalSelecionado, setFiscalSelecionado] = useState<string>(
        idFiscalAtual ? String(idFiscalAtual) : ""
    );

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="protocolo" value={protocolo} />

            {state?.error && (
                <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xs">
                    {state.error}
                </div>
            )}

            {state?.success && (
                <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xs">
                    {state.message || "Fiscal atribuído com sucesso!"}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="idFiscal" className="text-xs font-bold text-gray-600 tracking-wider">
                    SELECIONAR FISCAL RESPONSÁVEL
                </label>
                <select
                    id="idFiscal"
                    name="idFiscal"
                    value={fiscalSelecionado}
                    onChange={(e) => setFiscalSelecionado(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded-xs bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secundaria"
                >
                    <option value="">Escolha um fiscal disponível...</option>
                    {fiscais.map((f) => (
                        <option key={f.idFuncionario} value={f.idFuncionario}>
                            {f.nome} ({f.email})
                        </option>
                    ))}
                </select>
                {fiscais.length === 0 && (
                    <p className="text-xs text-amber-600">
                        Nenhum fiscal cadastrado no sistema no momento.
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending || !fiscalSelecionado || fiscais.length === 0}
                className="flex items-center justify-center gap-2 bg-secundaria text-primaria font-semibold px-6 py-3 rounded-xs hover:brightness-125 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
                <FaUserCheck />
                {isPending ? "Atribuindo Fiscal..." : "Atribuir Fiscal e Iniciar Análise"}
            </button>
        </form>
    );
}
