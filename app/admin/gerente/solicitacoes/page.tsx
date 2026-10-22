import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checarAutenticacao } from '@/services/AuthCheck';
import { getTodasSolicitacoes } from '@/services/getSolicitacoes';
import SolicitacoesGerenteBody from './SolicitacoesGerenteBody';

export const metadata: Metadata = {
    title: 'SAVV - Gestão de Solicitações',
};

export default async function SolicitacoesGerentePage() {
    const auth = await checarAutenticacao();

    if (!auth || auth.cargo !== 'gerente') {
        redirect('/login/funcionario');
    }

    const solicitacoes = await getTodasSolicitacoes();

    return <SolicitacoesGerenteBody solicitacoesIniciais={solicitacoes} />;
}
