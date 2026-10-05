'use client'

import { useActionState, useState } from "react";
import dynamic from 'next/dynamic';
import { criarServicoAction } from "@/app/actions/criarServico";

// Mapa dependente do window, deve ser importado via dynamic com ssr: false
const MapaSelecao = dynamic(() => import('@/components/MapaSelecao'), { ssr: false });

export default function FormServico() {
    const [state, action, isPending] = useActionState(criarServicoAction, null);

    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);

    const buscarCep = async () => {
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;

        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await res.json();
            if (!data.erro) {
                setRua(data.logradouro || '');
                setBairro(data.bairro || '');
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const enderecoFormatado = `${rua}, ${bairro} - CEP: ${cep}`;

    return (
        <form action={action} className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-lg shadow-md border-t-gray-100 border-t">
            {state?.error && (
                <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-300">
                    {state.error}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="observacao" className="font-semibold text-gray-500">OBSERVAÇÃO</label>
                <textarea
                    name="observacao"
                    id="observacao"
                    required
                    placeholder="Descreva a solicitação detalhadamente (ex: Árvore com risco de queda...)"
                    className="p-3 border border-gray-300 rounded-md resize-none h-28 focus:outline-none focus:ring-2 focus:ring-success"
                />
            </div>

            <fieldset className="flex flex-col gap-4 p-4 border border-gray-200 rounded-md">
                <legend className="font-semibold text-gray-500 px-2">ENDEREÇO</legend>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cep" className="text-sm font-medium text-gray-500">CEP</label>
                        <input
                            type="text"
                            id="cep"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={buscarCep}
                            maxLength={9}
                            placeholder="18110-000"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-success"
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="bairro" className="text-sm font-medium text-gray-500">BAIRRO</label>
                        <input
                            type="text"
                            id="bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            placeholder="Bairro..."
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-success"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="rua" className="text-sm font-medium text-gray-500">RUA</label>
                    <input
                        type="text"
                        id="rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        placeholder="Nome da rua..."
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-success"
                    />
                </div>

                <input type="hidden" name="endereco" value={enderecoFormatado} />
            </fieldset>

            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-800">LOCALIZAÇÃO NO MAPA</label>
                <p className="text-sm text-gray-500 mb-2">Clique no mapa para marcar a localização exata da ocorrência.</p>
                <div className="relative border border-gray-300 rounded-md overflow-hidden">
                    <MapaSelecao onLocationSelect={(lt, lg) => { setLat(lt); setLng(lg); }} />
                </div>

                {lat && lng ? (
                    <p className="text-sm font-medium text-green-600 mt-1">Localização selecionada com sucesso!</p>
                ) : (
                    <p className="text-sm font-medium text-red-500 mt-1">Por favor, selecione um local no mapa.</p>
                )}

                <input type="hidden" name="lat" value={lat || ''} />
                <input type="hidden" name="lng" value={lng || ''} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="categoria" className="font-semibold text-gray-600">CATEGORIA DO SERVIÇO</label>
                    <select name="categoria" id="categoria" required className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-success">
                        <option value="">Selecione...</option>
                        <option value="poda">Poda de Árvore</option>
                        <option value="plantio">Plantio</option>
                        <option value="erradicacao">Erradicação (Remoção)</option>
                        <option value="rocagem">Roçagem</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="imagem" className="font-semibold text-gray-600">IMAGEM (EVIDÊNCIA)</label>
                    <input
                        type="file"
                        name="imagem"
                        id="imagem"
                        accept="image/*"
                        required
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-success bg-white"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending || !lat || !lng}
                className="mt-4 w-full md:w-auto self-center bg-secundaria text-lg text-primaria font-semibold py-3 px-8 rounded-xs hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
        </form>
    );
}
