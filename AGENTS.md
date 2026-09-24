<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SAVV - Sistema de Atendimento e Vigilância Verde (Votorantim)

Aplicação desenvolvida para modernizar, organizar e dar transparência às solicitações de serviços ambientais entre os munícipes e a Secretaria de Meio Ambiente de Votorantim.

---

## Arquitetura e tecnologias

- **Framework**: Next.js (App Router) + React 19 + TypeScript
- **Estilização**: Tailwind CSS v4
- **Visualização de Dados**:
  - Mapas: Leaflet / React-Leaflet
  - Dashboards: Chart.js / React-Chartjs-2
- **Banco de Dados**: MariaDB / MySQL via Docker Compose (`docker-compose.yaml`)
- **Backend / Camada de Dados**: Route Handlers (`src/app/api/...`) e/ou Server Actions em Next.js

---

## Comandos

- `npm run build`: Executa o build de produção e checagem de tipos
- `npm run lint`: Executa a verificação do ESLint
- `docker compose up -build`: Inicia tanto o servidor de desenvolvimento ("npm run dev" para o Next), quanto o servidor de banco de dados (MariaDB/MySQL)

---

## Diretrizes de Desenvolvimento

1. **Client Components vs SSR (Crucial)**:
   - Componentes que utilizam **Leaflet** (`react-leaflet`) ou **Chart.js** dependem de APIs do navegador (`window`, `document`) devem SEMPRE conter a diretiva `'use client'`.
   - Ao importar mapas ou gráficos em páginas que rodam no servidor, utilize importação dinâmica com desativação de SSR:
     ```tsx
     import dynamic from 'next/dynamic';
     const MapaExibicao = dynamic(() => import('@/components/MapaExibicao'), { ssr: false });
     ```

2. **Organização de Diretórios (`src/`)**:
   - `src/app/`: Rotas, páginas e layouts do App Router.
   - `src/app/api`: Rotas e funções do Backend.
   - `src/components/`: Componentes reutilizáveis de interface.
   - `src/services/`: Regras de negócio utilitárias, formatação e integrações.
   - `src/types/`: Interfaces e tipos TypeScript compartilhados.

3. **Padrões de Código**:
   - Manter código limpo e com tipagem estrita (TypeScript).
   - Nomes de componentes em PascalCase (ex: `MapaExibicao.tsx`).
   - Nomes de variáveis e funções sempre em camelCase.
   - Comentários sempre curtos em português e APENAS em situações de apontamento realmente necessário ou crítico.
   - Não adicionar dependências pesadas sem necessidade prévia.

---

## Papéis, Permissões e Regras de Negócio

### 1. Visitante (Não Autenticado)
- **Acesso**: Apenas leitura à página inicial (mapas públicos de exibição) e dados da página de **Transparência**.
- **Ações permitidas**: Login (`/login`) e Registro de nova conta (`/registrar`).

### 2. Usuário (Munícipe Autenticado)
- **Acesso**: Pode solicitar novos serviços ambientais (`/servico`) e gerenciar sua conta (`/minha-conta`).
- **Campos da Solicitação**:
  - `protocolo`: Identificador único da solicitação.
  - `data`: Data e hora do envio.
  - `endereco`: Rua, número, bairro e CEP concatenados.
  - `observacao`: Descrição detalhada do problema.
  - `coordenadas`: Latitude e longitude para marcação no mapa.
  - `imagem`: Caminho/URL da foto anexada pelo cidadão.
  - `tipoServico`: `"poda"` | `"plantio"` | `"erradicacao"` | `"rocagem"`
  - `status`: Situação do chamado (veja fluxo abaixo).
  - `idUsuario`: Vínculo com o munícipe solicitante.

### 3. Funcionários (Administração Municipal)
Toda mudança de status de uma solicitação gera um registro de auditoria na tabela **Histórico**.

- **Diretor**:
  - Responsável pela administração geral e cadastro de novos funcionários no sistema.
- **Gerente**:
  - Analisa solicitações em triagem inicial.
  - **Negada**: Altera o status para `"cancelada"` e inclui observação com a justificativa.
  - **Aprovada para vistoria**: Altera o status para `"em analise"` e atribui a um Fiscal com data estipulada de visita.
  - Acesso a dashboards analíticos (gráficos semestrais, sazonalidade e mapa de calor de ocorrências).
  - Encerramento final: Após o parecer do fiscal, finaliza a solicitação como `"concluida"`.
- **Fiscal**:
  - Recebe as solicitações atribuídas pelo Gerente para vistoria in loco.
  - Elabora o **Relatório Técnico** de vistoria.
  - **Parecer Negativo**: Devolve a solicitação com status `"cancelada"` anexando o relatório.
  - **Parecer Positivo**: Mantém `"em analise"` e devolve o relatório ao Gerente para que este determine a execução e conclusão.

---

## Fluxo de Estados da Solicitação

```text
[ Munícipe cria ] 
       │
       ▼
  "pendente" ──(Gerente recusa)──► "cancelada" (com justificativa)
       │
       │ (Gerente aprova e designa Fiscal)
       ▼
  "em analise"
       │
       ├─► (Fiscal recusa vistoria) ──► "cancelada" (com relatório)
       │
       └─► (Fiscal aprova vistoria e Gerente conclui) ──► "concluida"
```