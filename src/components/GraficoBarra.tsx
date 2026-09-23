'use client'

// importa só o que a gente vai usar na criação do gráfico
import {
    Chart as ChartJS, //representa o gráfico em si
    CategoryScale, // representa o eixo X marcado pelas categorias
    LinearScale, // representa o eixo Y marcado pelos valores
    BarElement, // representa a própria barra do gráfico
    Tooltip, // representa o balaozinho de dicas quando vc passa o mouse em cima
    type ChartOptions // arquivo de tipagem do gráfico, para orientar as options    
} from 'chart.js';

import { Bar } from 'react-chartjs-2'; //representa o componente da barra que vai ser renderizado
import ChartDataLabels from 'chartjs-plugin-datalabels'; // representa o plugin que vai colocar os números em cima das barras

interface GraficoBarraProps {
    dadosGrafico: {chave: string, valor: number}[];
}

export default function GraficoBarra({dadosGrafico}: GraficoBarraProps) {
    // aqui a gente avisa pra biblioteca todos os elementos que serao usados no gráfico
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        ChartDataLabels
    );

    // essa variável guarda toda a configuração do gráfico
    const options: ChartOptions<'bar'> = {
        // fala pra ele ser responsivo
        responsive: true,
        // desativa a manutenção da proporção do gráfico, pra ele se adaptar melhor ao container
        maintainAspectRatio: false,
        // atribui a configuração do layout, escalas e plugins
        layout: {
            padding: { top: 30 } // Espaço para os números não cortarem
        },
        // configura os eixos do gráfico
        scales: {
            x: {
                grid: { display: false }, // Remove as linhas verticais
                ticks: { font: { size: 14, family: 'Poppins' } }, // Fonte do eixo X
                border: { display: true }, // Remove a linha da base
            },
            y: {
                display: false, // Esconde o eixo Y inteiro para bater com o layout
            },
        },
        plugins: {
            legend: { display: false, }, // Sem legenda padrão
            tooltip: { enabled: true }, // habilita o balaozinho
            datalabels: {
                anchor: 'end', // fala pros números ficarem em cima da barra
                align: 'top', // fala pros números ficarem em cima da barra
                font: { weight: 'bold', size: 12, family: 'Poppins' }, // fonte do número
                // Lógica para colorir o texto do label em destaque
                color: (context: any) => {
                    const valor = context.dataset.data[context.dataIndex];
                    const maiorValor = Math.max(...context.dataset.data);

                    return valor === maiorValor ? '#054100' : '#4b5563'; // Verde escuro para o destaque, cinza para os outros
                },
            },
        },
    };

    // Os dados dinâmicos recebidos via props (da API)
    const data = {
        labels: dadosGrafico.map(item => item.chave), // pega os meses do array de dados

        datasets: [
            {
                data: dadosGrafico.map(item => item.valor), // pega os valores do array de dados
                // Lógica para colorir a barra que tem o maior valor (ou valor específico)
                backgroundColor: dadosGrafico.map(item =>
                    item.valor === Math.max(...dadosGrafico.map(i => i.valor)) ? '#054100' : '#e5e7eb' // Verde escuro vs Cinza claro
                ),
                barThickness: 15, // Deixa a barra mais fina, como no protótipo
                borderRadius: 0,
            },
        ],
    };
    return (<Bar data={data} options={options} />)
}