import MapaExibicao from "../components/MapaExibicao";
import Navbar from "../components/Navbar";
import { type MarcadorServico } from "../types/Servico";

export default function Home() {

    const mockMarcadores: MarcadorServico[] = [
        { id: 1, situacao: "pendente", categoria: "poda", coordenadas: { lat: -23.5390, lng: -47.4450 } },
        { id: 2, situacao: "concluida", categoria: "erradicacao", coordenadas: { lat: -23.5520, lng: -47.4370 } },
        { id: 3, situacao: "negada", categoria: "erradicacao", coordenadas: { lat: -23.5420, lng: -47.4580 } },
        { id: 4, situacao: "pendente", categoria: "plantio", coordenadas: { lat: -23.5610, lng: -47.4310 } },
        { id: 5, situacao: "concluida", categoria: "rocagem", coordenadas: { lat: -23.5350, lng: -47.4350 } },
    ]

    return (
        <>
            <Navbar tipo="visitante" />
            <div className="relative h-screen w-full flex flex-col items-center justify-center gap-6 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/foto-de-floresta.jpg')] bg-cover shadow-2xl bg-center bg-no-repeat brightness-50 grayscale group-hover:grayscale-0 transition-all duration-1000 z-0" />
                <h1 className="text-6xl text-center font-extrabold text-white z-10 select-none max-w-2xl">Solicite Serviços Ambientais</h1>
                <p className="text-xl text-center font-normal text-primaria z-10 select-none max-w-2xl">Uma plataforma para a solicitação de serviços ambientais. Transparência total para o cidadão.</p>
                <button className="bg-primaria z-10 mt-4 cursor-pointer text-secundaria font-bold py-3 px-10 rounded-xs hover:scale-105 hover:brightness-90 transition-transform duration-200">Solicitar Serviço</button>
            </div>
            <section className="w-full h-fit bg-primaria flex flex-row justify-between gap-6 py-20 mx-auto px-10">
                <div className="h-fit flex flex-col items-start justify-center gap-2 w-fit">
                    <p className="text-xl z-10 font-bold text-center text-gray-500">Serviços Solicitados</p>
                    <h1 className="text-8xl mt-2 font-extrabold text-center text-secundaria">87</h1>
                </div>

                <div className=" h-fit flex flex-col items-start justify-center gap-2 w-fit">
                    <p className="text-xl z-10 font-bold text-center text-gray-500">Serviços Concluídos</p>
                    <h1 className="text-8xl mt-2 font-extrabold text-center text-secundaria">72</h1>
                </div>

                <div className=" h-fit flex flex-col items-start justify-center gap-2 w-fit">
                    <p className="text-xl z-10 font-bold text-center text-gray-500">Árvores Plantadas</p>
                    <h1 className="text-8xl mt-2 font-extrabold text-center text-secundaria">150</h1>
                </div>
            </section>
            <article className="flex flex-row mx-16 my-6 border border-gray-300 rounded-sm">
                <div className="w-3/4 h-130 z-10">
                    <MapaExibicao marcadores={mockMarcadores} />
                </div>
                <aside className="w-1/4 self-center">
                    <div className="flex flex-col px-8">
                        <h1 className="border-b border-gray-400 font-semibold mb-6 pb-2">PARÂMETROS DE EXIBIÇÃO</h1>
                        <div className="gap-3 flex-col flex">
                            <div className="flex flex-row justify-between">
                                <p>Poda de Árvores</p>
                                <input type="checkbox" defaultChecked className="w-4 accent-secundaria checkboxSavv"></input>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Erradicação</p>
                                <input type="checkbox" defaultChecked className="w-4 accent-secundaria checkboxSavv" />
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Plantio</p>
                                <input type="checkbox" defaultChecked className="w-4 accent-secundaria checkboxSavv" />
                            </div>
                        </div>
                    </div>
                </aside>
            </article>
        </>
    )
}
