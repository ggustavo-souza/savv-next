import GraficoBarra from "../../components/GraficoBarra";
import GraficoPizza from "../../components/GraficoPizza";
import MapaExibicao from "../../components/MapaExibicao";
import type { MarcadorServico } from "../../types/Servico";
import { BsList } from "react-icons/bs";
import ConverterNomeMes from "@/src/services/ConverterNomeMes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAVV - Transparência",
};

export default function Transparencia() {

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

    const mockMarcadores: MarcadorServico[] = [
        { id: 1, situacao: "pendente", categoria: "poda", coordenadas: { lat: -23.5390, lng: -47.4450 } },
        { id: 2, situacao: "concluida", categoria: "erradicacao", coordenadas: { lat: -23.5520, lng: -47.4370 } },
        { id: 3, situacao: "negada", categoria: "erradicacao", coordenadas: { lat: -23.5420, lng: -47.4580 } },
        { id: 4, situacao: "pendente", categoria: "plantio", coordenadas: { lat: -23.5610, lng: -47.4310 } },
        { id: 5, situacao: "concluida", categoria: "rocagem", coordenadas: { lat: -23.5350, lng: -47.4350 } },
    ]

    return (
        <>
            <div className="w-full h-screen flex flex-row mt-20 justify-between gap-6">
                <article className="flex flex-col w-3/2 text-start ms-12 gap-3">
                    <p className="font-bold text-secundaria">NOSSA ATUAÇÃO</p>
                    <h1 className="text-5xl font-bold text-black">Transparência de Dados</h1>
                    <p className="text-md font-light text-secundaria">Zelamos pela transparência e integridade dos nossos dados em todas as nossas operações.</p>
                </article>
                <aside className="w-full h-3/4 border border-gray-400 flex rounded-sm items-center justify-center me-10">
                    <MapaExibicao marcadores={mockMarcadores} />
                </aside>
            </div>
            <section className="my-10">
                {/* {Div dos gráficos} */}
                <div className="w-full h-fit flex flex-row items-center justify-center gap-6 mt-10">
                    <h1 className="text-4xl w-fit font-bold text-black mb-4 border-b-3">GRÁFICOS E DADOS</h1>
                </div>
                <div className="w-full flex justify-center gap-4 mt-10">
                    <div className="flex flex-col w-1/2 shadow-sm">
                        <header className="w-full border-b border-gray-300 p-10">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="text-gray-400 font-semibold">PERFORMANCE SEMESTRAL</p>
                                    <h2 className="font-bold text-2xl">Denúncias Resolvidas (2026)</h2>
                                </div>
                                <button className="flex self-end items-center py-2 px-3 flex-row font-semibold text-xs rounded-sm bg-secundaria text-primaria">2026 <BsList /></button>
                            </div>
                            <div className="flex flex-row justify-between mt-6">
                                <div className="">
                                    <p className="text-gray-400 font-bold">Total Resolvido</p>
                                    <h2 className="text-2xl font-bold">{somaValores}</h2>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-bold">Eficiência (Média)</p>
                                    <h2 className="text-2xl font-bold">{`${eficienciaDenuncias.toFixed(2)}%`}</h2>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-bold">Mês de Pico</p>
                                    <h2 className="text-2xl font-bold">{ConverterNomeMes(mesPico)}</h2>
                                </div>
                            </div>
                        </header>
                        <div className="w-full h-100 self-center items-center rounded-sm justify-center shadow-lg py-4">
                            <GraficoBarra dadosGrafico={dadosGrafico} />
                        </div>
                    </div>
                    <div className="w-1/4 self-center text-center items-center rounded-sm justify-center shadow-lg py-4">
                        <GraficoPizza dadosGrafico={[40, 30, 30]} />
                    </div>
                </div>
            </section>
        </>
    );
}