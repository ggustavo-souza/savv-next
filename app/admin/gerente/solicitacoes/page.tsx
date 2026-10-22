export default function SolicitacoesGerentePage() {
    return (
        <>
            <header className="flex flex-row mx-12 my-16 justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-secundaria font-semibold">CENTRAL DE OPERAÇÕES</p>
                    <h1 className='text-5xl text-preta font-bold'>Gestão de Denúncias</h1>
                </div>
            </header>
            <main>
                <header className='flex flex-row mx-12 gap-6 p-2 mb-6'>
                    <p className="font-semibold text-gray-900 border-b-2 border-b-black cursor-pointer">TODAS</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">PENDENTES</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">EM ANDAMENTO</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">DEVOLVIDAS</p>
                    <p className="font-semibold text-gray-500 cursor-pointer hover:brightness-75 transition-all duration-100">CONCLUÍDAS</p>
                </header>
                <section>
                    {/* todas as solicitações */}
                </section>
            </main>
        </>
    );
}
