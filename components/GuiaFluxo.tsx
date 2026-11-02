import Link from "next/link";

type Etapa = {
    numero: number;
    titulo: string;
    descricao: string;
    icone: React.ReactNode;
};

const etapas: Etapa[] = [
    {
        numero: 1,
        titulo: "Crie sua conta",
        descricao: "Cadastre-se gratuitamente com nome, e-mail e senha. É rápido e simples — você só precisa de alguns minutos.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M6.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM3.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM19.75 7.5a.75.75 0 0 0-1.5 0v2.25H16a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H22a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
            </svg>
        ),
    },
    {
        numero: 2,
        titulo: "Faça sua solicitação",
        descricao: "Identifique o problema ambiental no mapa, escolha o tipo de serviço (poda, plantio, erradicação ou roçagem), descreva o caso e envie.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        numero: 3,
        titulo: "Triagem pelo Gerente",
        descricao: "A secretaria analisa sua solicitação. Se aprovada, ela é encaminhada a um fiscal para vistoria in loco com data agendada.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        numero: 4,
        titulo: "Vistoria do Fiscal",
        descricao: "Um fiscal vai ao local indicado, elabora um relatório técnico e emite o parecer. Com parecer positivo, o caso retorna ao gerente.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
        ),
    },
    {
        numero: 5,
        titulo: "Conclusão do serviço",
        descricao: "Com o parecer do fiscal em mãos, o gerente finaliza a solicitação como concluída. Você acompanha tudo pela plataforma em tempo real.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
        ),
    },
];

export default function GuiaFluxo() {
    return (
        <section className="w-full bg-secundaria py-20 px-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-extrabold text-primaria">Como funciona o SAVV?</h2>
                    <p className="mt-3 text-primaria/70 text-base max-w-xl mx-auto">
                        Entenda o fluxo completo — da solicitação à conclusão do serviço ambiental.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {etapas.map((etapa, index) => (
                        <div key={etapa.numero} className="flex flex-col items-center gap-3 cursor-pointer">
                            <div
                                className="relative w-full flex flex-col items-center text-center gap-4 rounded-sm px-5 py-8 border border-primaria/20 bg-secundaria text-primaria transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primaria"
                            >
                                <span
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primaria text-secundaria"
                                >
                                    {etapa.numero}
                                </span>

                                <div className="p-3 rounded-full bg-primaria/10 text-primaria">
                                    {etapa.icone}
                                </div>

                                <h3 className="font-bold text-base leading-tight">{etapa.titulo}</h3>

                                <p className="text-sm leading-relaxed text-primaria/60">
                                    {etapa.descricao}
                                </p>
                            </div>

                            {index < etapas.length - 1 && (
                                <div className="hidden lg:flex items-center justify-center w-full mt-0 absolute">
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/registrar"
                        className="bg-primaria text-secundaria font-bold py-3 px-10 rounded-xs hover:scale-105 hover:brightness-90 transition-all duration-200"
                    >
                        Comece agora
                    </Link>
                </div>
            </div>
        </section>
    );
}
