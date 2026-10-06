'use client'

import { useActionState, useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { atualizarFotoAction } from "@/app/actions/atualizarFoto";

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
        <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-secundaria/20 shadow-md bg-gray-100 relative">
                    <Image
                        src={imagemSrc}
                        alt={`Foto de ${nomeUsuario}`}
                        fill
                        sizes="128px"
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <form action={formAction} className="flex flex-col gap-3 w-full max-w-sm">
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="foto"
                        className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                        Alterar foto de perfil
                    </label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        id="foto"
                        name="foto"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-secundaria/10 file:text-secundaria hover:file:bg-secundaria/20 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xs p-1 bg-white"
                    />
                </div>

                {state?.error && (
                    <div className="p-2 text-xs text-red-700 bg-red-50 rounded-xs border border-red-200">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="p-2 text-xs text-green-700 bg-green-50 rounded-xs border border-green-200">
                        {state.message}
                    </div>
                )}

                {previewUrl && (
                    <div className="flex items-center gap-2 mt-1">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-secundaria text-primaria text-sm font-semibold px-4 py-2 rounded-xs hover:bg-green-900 disabled:opacity-60 transition-colors cursor-pointer"
                        >
                            {isPending ? 'Salvando...' : 'Salvar nova foto'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelar}
                            disabled={isPending}
                            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 cursor-pointer transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
