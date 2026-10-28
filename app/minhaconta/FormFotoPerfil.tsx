'use client'

import { useActionState, useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { atualizarFotoAction } from "@/app/actions/atualizarFoto";
import { FiCamera } from "react-icons/fi";

interface FormFotoPerfilProps {
    fotoAtual: string;
    nomeUsuario: string;
}

export default function FormFotoPerfil({ fotoAtual, nomeUsuario }: FormFotoPerfilProps) {
    const [state, formAction, isPending] = useActionState(atualizarFotoAction, null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleCancelar = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const imagemSrc = previewUrl || `/repository/${fotoAtual}`;

    return (
        <div className="flex flex-col items-center sm:items-start gap-4 shrink-0">
            {/* Avatar com overlay de câmera */}
            <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-secundaria/15 shadow-lg bg-gray-100 relative ring-2 ring-white">
                    <Image
                        src={imagemSrc}
                        alt={`Foto de ${nomeUsuario}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Overlay de câmera no hover */}
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FiCamera className="text-white text-xl" />
                </div>
            </div>

            <form action={formAction} className="flex flex-col gap-3 w-full max-w-xs">
                <input
                    ref={fileInputRef}
                    type="file"
                    id="foto"
                    name="foto"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!previewUrl && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-semibold text-secundaria hover:text-green-800 cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                        <FiCamera className="text-sm" />
                        Alterar foto
                    </button>
                )}

                {state?.error && (
                    <div className="p-2.5 text-xs text-red-700 bg-red-50 rounded-xs border border-red-200">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="p-2.5 text-xs text-green-700 bg-green-50 rounded-xs border border-green-200">
                        {state.message}
                    </div>
                )}

                {previewUrl && (
                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-secundaria text-primaria text-xs font-semibold px-4 py-2 rounded-xs hover:brightness-125 disabled:opacity-60 transition-all cursor-pointer"
                        >
                            {isPending ? 'Salvando...' : 'Salvar foto'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelar}
                            disabled={isPending}
                            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2 cursor-pointer transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
