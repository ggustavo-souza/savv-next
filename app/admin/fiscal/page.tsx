import { Metadata } from "next"
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import { getSolicitacoesEmAndamento } from "@/services/getSolicitacoes";
import Image from "next/image";
import { FaMapPin, FaUser, FaCalendarAlt, FaEye } from "react-icons/fa";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SAVV - Fiscal"
}

export default async function HomeFiscal() {

    const auth = await checarAutenticacao();

    if (!auth || auth.cargo !== 'fiscal') {
        redirect('/login/funcionario');
    }

    const solicitacoes = await getSolicitacoesEmAndamento();

    const formatarCategoria = (cat: string) => {
        const mapa: Record<string, string> = {
            poda: 'Poda',
            plantio: 'Plantio',
            erradicacao: 'Erradicação',
            rocagem: 'Roçagem',
        };
        return mapa[cat] ?? cat;
    };

    return (
        <>
            <header className="flex flex-row mx-12 my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DO FISCAL</p>
                    <h1 className='text-5xl text-preta font-bold'>Gestão de Tarefas</h1>
                </div>
            </header>
            <main className="mx-6 md:mx-12 pb-16">
                <header className='flex flex-row gap-6 py-2'>
                    <p className="font-semibold text-gray-900 border-b-2 border-b-black cursor-pointer">TODAS</p>
                </header>
                <section>
                    <div className="grid grid-cols-1 gap-4">
                        {solicitacoes.map((sol) => {
                            return (
                                <div
                                    key={sol.protocolo}
                                    className="bg-white border border-gray-200 rounded-xs p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                                >
                                    {/* Imagem miniatura */}
                                    <div className="relative w-full md:w-36 h-28 shrink-0 bg-gray-100 rounded-xs overflow-hidden border border-gray-200">
                                        {sol.imagem ? (
                                            <Image
                                                src={`/repository/${sol.imagem}`}
                                                alt={`Solicitação #${sol.protocolo}`}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                Sem foto
                                            </div>
                                        )}
                                    </div>

                                    {/* Informações centrais */}
                                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-bold text-gray-700 bg-gray-100 text-xs px-2.5 py-1 rounded-xs">
                                                #{sol.protocolo}
                                            </span>
                                            <span className={`text-xs px-2.5 py-1 rounded-xs font-semibold bg-blue-600 text-white`}>
                                                EM ANDAMENTO
                                            </span>
                                            <span className={`text-xs px-2.5 py-1 rounded-xs font-medium border ${sol.categoria === "poda" || sol.categoria === "rocagem" ? ("border-warning bg-warning/40 text-yellow-800") : sol.categoria === "erradicacao" ? "border-red-200 bg-red-50 text-red-800" : ("border-green-200 bg-green-50 text-secundaria")} `}>
                                                {formatarCategoria(sol.categoria)}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-800 font-medium line-clamp-2">
                                            {sol.observacao}
                                        </p>

                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <FaMapPin className="text-secundaria" />
                                                <span className="truncate max-w-xs">{sol.endereco}</span>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaUser className="text-gray-400" />
                                                <span>{sol.nomeUsuario}</span>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-gray-400" />
                                                <span>
                                                    {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(sol.data))}
                                                </span>
                                            </span>
                                            {sol.nomeFiscal && (
                                                <span className="text-blue-700 font-medium">
                                                    Fiscal: {sol.nomeFiscal}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Botão de direcionamento para visualização específica */}
                                    <div className="w-full md:w-auto shrink-0 flex items-center">
                                        <Link
                                            href={`/admin/fiscal/${sol.protocolo}`}
                                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-secundaria text-primaria font-semibold px-5 py-2.5 rounded-xs hover:brightness-125 transition-all cursor-pointer text-sm"
                                        >
                                            <FaEye />
                                            <span>Averiguar Detalhes</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}