'use client'

import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function BotaoConfiguracoesConta() {
    return (
        <div className="flex flex-col text-center sm:text-left gap-1 mt-2">
            <button
                onClick={() => redirect('/minhaconta/configuracoes')}
                className="px-4 flex cursor-pointer flex-row py-3 bg-secundaria text-primaria text-md font-semibold rounded-xs self-center sm:self-start hover:bg-secundaria/90 transition-colors"
            >
                <FaUser className="mr-2 self-center" />
                Configurações da Conta
            </button>
        </div>
    )
}