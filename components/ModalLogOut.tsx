'use client'

import { logoutAction } from "@/app/actions/logout";
import { useTransition, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalLogOutProps {
    onClose: () => void;
}

export default function ModalLogOut({ onClose }: ModalLogOutProps) {
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isPending) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, isPending]);

    const handleConfirmar = () => {
        startTransition(async () => {
            await logoutAction();
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/60 transition-opacity cursor-pointer"
                onClick={!isPending ? onClose : undefined}
                aria-hidden="true"
            />

            <div className="relative z-10 bg-primaria w-full max-w-lg p-6 sm:p-8 rounded-xs shadow-xl border border-gray-200 flex flex-col">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isPending}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors disabled:opacity-50"
                    aria-label="Fechar"
                >
                    <IoClose size={24} />
                </button>

                <div className="text-left flex flex-col gap-2">
                    <p className="text-xs text-secundaria font-semibold uppercase tracking-wider">
                        Encerramento de Sessão
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-preta">
                        Deseja realmente sair?
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Tem certeza de que quer realmente deslogar da sua conta? Você retornará à tela inicial como visitante.
                    </p>
                </div>

                <div className="flex flex-row justify-between gap-3 mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="bg-gray-500 text-primaria px-4 py-2 w-1/2 rounded-xs hover:brightness-90 cursor-pointer transition-all disabled:opacity-50 font-medium text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirmar}
                        disabled={isPending}
                        className="bg-red-600 text-primaria px-5 py-2 w-full rounded-xs hover:brightness-90 cursor-pointer transition-all disabled:opacity-50 font-semibold text-md flex items-center justify-center min-w-24"
                    >
                        {isPending ? 'Saindo...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
