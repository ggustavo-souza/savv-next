import GraficoBarra from "../../components/GraficoBarra";
import GraficoPizza from "../../components/GraficoPizza";
import MapaExibicao from "../../components/MapaExibicao";
import type { MarcadorServico } from "../../types/Servico";
import { BsList } from "react-icons/bs";
import ConverterNomeMes from "@/src/services/ConverterNomeMes";
import type { Metadata } from "next";
import { db } from "@/src/lib/db";
import { servicos } from "@/src/lib/db/schema";

export const metadata: Metadata = {
    title: "SAVV - Transparência",
};

export default async function Transparencia() {

    const dadosGrafico = [
        { chave: 'Jan', valor: 300 },
        { chave: 'Fev', valor: 450 },
        { chave: 'Mar', valor: 700 },
        { chave: 'Abr', valor: 200 },
        { chave: 'Mai', valor: 400 },
        { chave: 'Jun', valor: 400 },
    ];

    const somaValores = dadosGrafico.reduce((acc, item) => acc + item.valor, 0);

    const allDenuncias: number = 2800;
    const eficienciaDenuncias: number = (somaValores / allDenuncias) * 100

    const mesPico = dadosGrafico.reduce((maior, atual) =>
        atual.valor > maior.valor ? atual : maior
    ).chave;

    const marcadoresSolicitacao: MarcadorServico[] = await db.select({protocolo: servicos.protocolo, status: servicos.status, categoria: servicos.categoria , coordenadas: {lat: servicos.lat, lng: servicos.lng}}).from(servicos)

    return (
        <>
            <div className="w-full min-h-[calc(100vh-6rem)] flex flex-col lg:flex-row justify-center items-center gap-10 px-6 sm:px-12 lg:px-16 xl:px-24s">
                <article className="flex flex-col w-full lg:w-5/12 text-center lg:text-start gap-4 lg:gap-6">
                    <p className="font-bold text-secundaria text-sm sm:text-base 2xl:text-lg uppercase tracking-wide">NOSSA ATUAÇÃO</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-black leading-tight">Transparência de Dados</h1>
                    <p className="text-base sm:text-lg 2xl:text-2xl font-light text-secundaria">Zelamos pela transparência e integridade dos nossos dados em todas as nossas operações.</p>
                </article>
                <aside className="w-full lg:w-7/12 h-[50vh] sm:h-[60vh] lg:h-[70vh] border border-gray-400 flex rounded-sm items-center justify-center">
                    <MapaExibicao marcadores={marcadoresSolicitacao} />
                </aside>
            </div>
            <section className="my-10 px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
                {/* {Div dos gráficos} */}
                <div className="w-full flex flex-col items-center justify-center gap-6 mt-10">
                    <h1 className="text-3xl sm:text-4xl 2xl:text-5xl w-fit font-bold text-black mb-4 border-b-3 text-center pb-2">GRÁFICOS E DADOS</h1>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-center gap-8 mt-10">
                    <div className="flex flex-col w-full lg:w-2/3 shadow-sm rounded-sm">
                        <header className="w-full border-b border-gray-300 p-6 sm:p-10">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div>
                                    <p className="text-gray-400 font-semibold text-sm sm:text-base 2xl:text-lg">PERFORMANCE SEMESTRAL</p>
                                    <h2 className="font-bold text-xl sm:text-2xl 2xl:text-3xl">Denúncias Resolvidas (2026)</h2>
                                </div>
                                <button className="flex self-start sm:self-end items-center py-2 px-4 gap-2 font-semibold text-xs sm:text-sm 2xl:text-base rounded-sm bg-secundaria text-primaria">2026 <BsList /></button>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-6">
                                <div>
                                    <p className="text-gray-400 font-bold text-sm sm:text-base 2xl:text-lg">Total Resolvido</p>
                                    <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold">{somaValores}</h2>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-bold text-sm sm:text-base 2xl:text-lg">Eficiência (Média)</p>
                                    <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold">{`${eficienciaDenuncias.toFixed(2)}%`}</h2>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-bold text-sm sm:text-base 2xl:text-lg">Mês de Pico</p>
                                    <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold">{ConverterNomeMes(mesPico)}</h2>
                                </div>
                            </div>
                        </header>
                        <div className="w-full h-80 sm:h-96 2xl:h-[500px] flex self-center items-center rounded-sm justify-center shadow-lg py-4 px-2">
                            <GraficoBarra dadosGrafico={dadosGrafico} />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 flex self-center lg:self-stretch text-center items-center rounded-sm justify-center shadow-lg py-8 px-4 h-80 sm:h-96 2xl:h-auto">
                        <GraficoPizza dadosGrafico={[40, 30, 30]} />
                    </div>
                </div>
            </section>
        </>
    );
}