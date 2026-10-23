'use client'

import { devolverSolicitacaoAction } from "@/app/actions/devolverSolicitacao";
import { useActionState, useState } from "react"
import { FaCheck, FaTimes } from "react-icons/fa";

interface FormDevolverSolicitacaoProps {
    protocolo: number
}


export default function FormDevolverSolicitacao({ protocolo }: FormDevolverSolicitacaoProps) {

    const [state, formAction, isPending] = useActionState(devolverSolicitacaoAction, null);
    const [tipoDevolucao, setTipoDevolucao] = useState<"cancelar" | "devolver" | "nenhum">("nenhum");

    return (
        <>
            <form action={formAction} className="flex flex-col gap-4">
                <button
                    className="flex flex-col bg-secundaria text-primaria p-6 items-center text-lg hover:scale-103 hover:brightness-125 transition-all duration-200 cursor-pointer"
                    onClick={() => setTipoDevolucao("devolver")}
                ><FaCheck />{isPending ? "Carregando Ação" : "Aprovar Ação"}</button>
                <button
                    className="flex flex-col bg-preta text-primaria p-6 items-center text-lg hover:scale-103 hover:brightness-125 transition-all duration-200 cursor-pointer"
                    onClick={() => setTipoDevolucao("cancelar")}
                ><FaTimes />{isPending ? "Carregando Ação" : "Cancelar Solicitação"}</button>
                <input type="hidden" name="protocolo" value={protocolo} readOnly />
                <input type="hidden" name="tipoDevolucao" value={tipoDevolucao} readOnly />

                {state?.error && (<p className="text-red-500">{state.message}</p>)}
                {state?.success && (<p className="text-success">{state.message ? state.message : "A ação foi feita com sucesso"}</p>)}


            </form>
        </>
    )
}