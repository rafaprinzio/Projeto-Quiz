# PRD — Quiz Web sobre Claude Code

> **Versão:** 1.1 — 2026-04-26  
> **Status:** Pronto para desenvolvimento

---

## 1. Visão Geral

**Produto:** Quiz interativo web sobre Claude Code  
**Objetivo:** Educar stakeholders e pessoas de negócio sobre o que é o Claude Code, suas capacidades e benefícios, de forma lúdica e progressiva.  
**Formato:** Verdadeiro ou Falso, 10 perguntas, dificuldade progressiva (fácil → intermediário → avançado).  
**Stack:** Next.js (App Router) + Supabase + Vercel

---

## 2. Contexto e Motivação

Claude Code é a CLI agentic da Anthropic que permite a desenvolvedores e empresas usar IA diretamente no terminal e em IDEs. O quiz visa aumentar a alfabetização sobre o produto para audiências não-técnicas (gestores, PMs, stakeholders), permitindo que tomem decisões mais informadas sobre adoção e uso.

---

## 3. Público-Alvo

**Persona principal:** Stakeholder / Pessoa de negócio  
- Cargo: Product Manager, Gerente, Executivo, Business Analyst  
- Conhecimento técnico: baixo a médio  
- Objetivo: Entender o que o Claude Code faz, o que é possível e o que não é  
- Motivação: Avaliar se a ferramenta faz sentido para o time ou empresa

---

## 4. Fluxo do Usuário (User Flow)

```
[Tela de Boas-vindas]
  ↓ Clica em "Iniciar Quiz"
[Pergunta 1 de 10]
  → Usuário escolhe: VERDADEIRO ou FALSO
  → Feedback imediato (correto/incorreto + explicação curta)
  ↓ Clica em "Próxima"
[Pergunta 2 de 10] ... [Pergunta 10 de 10]
  ↓
[Tela de Resultado Final]
  → Pontuação (X/10 acertos)
  → Badge/título baseado na pontuação
  → Resultado salvo no Supabase (silenciosamente, sem input do usuário)
  → Botão "Refazer Quiz"
```

---

## 5. Telas e Componentes

### 5.1 Tela de Boas-vindas
- Logo Claude / Anthropic (SVG)
- Título: "Quanto você sabe sobre Claude Code?"
- Subtítulo explicando o formato: 10 perguntas, V ou F, feedback instantâneo
- Botão primário: "Iniciar Quiz"
- Indicador de tempo estimado: "~3 minutos"

### 5.2 Tela de Pergunta
- Barra de progresso no topo (ex: "3/10")
- Badge de dificuldade: 🟢 Fácil / 🟡 Médio / 🔴 Avançado
- Card central com o texto da afirmação
- Dois botões grandes: **VERDADEIRO** | **FALSO**
- Estado pós-resposta:
  - Botão correto fica verde com ✓
  - Botão incorreto fica vermelho com ✗
  - Caixa de explicação aparece abaixo (texto curto)
  - Botão "Próxima Pergunta" aparece

### 5.3 Tela de Resultado
- Score visual: "Você acertou X de 10 perguntas"
- Badge de título baseado na pontuação:
  - 0–3: "Claude Curioso" 🌱
  - 4–6: "Claude Explorador" 🔍
  - 7–9: "Claude Especialista" ⚡
  - 10: "Claude Master" 🏆
- Resumo das perguntas com indicador de certo/errado
- Botão "Tentar Novamente"

### 5.4 Estado de Loading
- Spinner/skeleton exibido enquanto salva resultado no Supabase
- Não bloqueia a experiência — save acontece em background (fire-and-forget)

---

## 6. Identidade Visual

Baseado na identidade da Anthropic/Claude:

| Token | Valor |
|-------|-------|
| Cor primária | `#D97757` (laranja Claude) |
| Background | `#F5F0E8` (bege claro) |
| Texto principal | `#1A1A1A` |
| Texto secundário | `#6B6B6B` |
| Sucesso (correto) | `#16A34A` |
| Erro (incorreto) | `#DC2626` |
| Fonte | Inter (Google Fonts) |
| Border radius | `12px` (cards), `8px` (botões) |
| Sombra de card | `0 2px 12px rgba(0,0,0,0.08)` |

**Estilo geral:** Clean, minimalista, espaço em branco generoso. Sem imagens complexas — ícones SVG simples.

**Favicon:** Ícone do Claude (SVG simplificado, 32x32) — gerado via `app/favicon.ico`

---

## 7. SEO & Metadados

Configurado via `next/metadata` no `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Quiz Claude Code — Quanto você sabe?',
  description: 'Teste seus conhecimentos sobre o Claude Code da Anthropic em 10 perguntas de verdadeiro ou falso.',
  keywords: ['Claude Code', 'Anthropic', 'IA', 'quiz', 'Claude AI'],
  openGraph: {
    title: 'Quiz Claude Code',
    description: 'Você conhece o Claude Code? Faça o quiz e descubra!',
    type: 'website',
    locale: 'pt_BR',
    // URL preenchida após deploy na Vercel
  },
  robots: { index: true, follow: true },
};
```

---

## 8. Conteúdo — As 10 Perguntas

As perguntas seguem progressão de dificuldade: 1–3 básicas, 4–7 intermediárias, 8–10 avançadas.

---

### Pergunta 1 — 🟢 Fácil
**Afirmação:** Claude Code é uma ferramenta de linha de comando (CLI) criada pela Anthropic que permite usar IA diretamente no terminal.

**Resposta:** VERDADEIRO

**Explicação:** Claude Code é exatamente isso — uma CLI agentic da Anthropic que roda no terminal e permite ao Claude agir diretamente no seu ambiente de desenvolvimento, lendo arquivos, executando comandos e muito mais.

---

### Pergunta 2 — 🟢 Fácil
**Afirmação:** Claude Code só funciona em computadores Mac.

**Resposta:** FALSO

**Explicação:** Claude Code é compatível com macOS, Linux e Windows (via WSL). Ele roda em qualquer sistema onde o Node.js esteja instalado.

---

### Pergunta 3 — 🟢 Fácil
**Afirmação:** Claude Code pode ler e escrever arquivos diretamente no computador do usuário.

**Resposta:** VERDADEIRO

**Explicação:** Uma das principais capacidades do Claude Code é interagir com o sistema de arquivos — ele pode ler, criar, editar e deletar arquivos, sempre com a supervisão e aprovação do usuário.

---

### Pergunta 4 — 🟡 Médio
**Afirmação:** Claude Code é completamente gratuito e sem limites de uso para qualquer pessoa.

**Resposta:** FALSO

**Explicação:** Claude Code requer uma assinatura Claude Pro/Max ou uma API Key da Anthropic (paga por uso). O acesso não é ilimitado nem gratuito — há planos e custos associados ao uso da API.

---

### Pergunta 5 — 🟡 Médio
**Afirmação:** Claude Code consegue executar testes automatizados e corrigir bugs no código sem precisar de intervenção humana em cada passo.

**Resposta:** VERDADEIRO

**Explicação:** Claude Code é agentic: ele pode rodar testes, identificar falhas, corrigir o código e rodar os testes novamente em ciclos automáticos — um loop de desenvolvimento autônomo supervisionado pelo dev.

---

### Pergunta 6 — 🟡 Médio
**Afirmação:** Claude Code pode trabalhar com múltiplos arquivos ao mesmo tempo para completar uma tarefa complexa.

**Resposta:** VERDADEIRO

**Explicação:** Diferente de um chatbot comum, o Claude Code entende o contexto de projetos inteiros. Ele navega por múltiplos arquivos, entende a estrutura do código e faz mudanças coordenadas em vários arquivos quando necessário.

---

### Pergunta 7 — 🟡 Médio
**Afirmação:** Claude Code pode ser integrado diretamente em IDEs como VS Code e IntelliJ sem precisar do terminal.

**Resposta:** VERDADEIRO

**Explicação:** Claude Code possui extensões oficiais para VS Code e IDEs da JetBrains (IntelliJ, PyCharm, etc.), permitindo usar todas as capacidades diretamente dentro do editor de código preferido do desenvolvedor.

---

### Pergunta 8 — 🔴 Avançado
**Afirmação:** Ao usar Claude Code, todo o código-fonte da empresa é automaticamente enviado para a Anthropic para treinamento de modelos.

**Resposta:** FALSO

**Explicação:** A Anthropic possui política de não usar dados de API para treinamento por padrão. Empresas que usam a API (incluindo via Claude Code) têm controle sobre seus dados. É importante verificar os termos de uso do plano contratado.

---

### Pergunta 9 — 🔴 Avançado
**Afirmação:** Claude Code suporta um sistema de "hooks" que permite executar scripts automáticos antes ou depois de certas ações, como salvar um arquivo ou rodar um comando.

**Resposta:** VERDADEIRO

**Explicação:** O sistema de hooks do Claude Code permite que times configurem automações que rodam em resposta a eventos específicos (ex: antes de um commit, após editar um arquivo). Isso possibilita integrar validações, formatadores e pipelines personalizados.

---

### Pergunta 10 — 🔴 Avançado
**Afirmação:** É possível criar fluxos com múltiplos agentes Claude Code trabalhando em paralelo no mesmo projeto.

**Resposta:** VERDADEIRO

**Explicação:** Claude Code suporta arquiteturas multi-agente via o Agent SDK da Anthropic. Um agente "orquestrador" pode delegar tarefas para sub-agentes especializados que rodam em paralelo, acelerando tarefas complexas como revisão de código em larga escala.

---

## 9. Especificações Técnicas

### 9.1 Stack Completa

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Framework | Next.js 14+ (App Router) | SSR, API Routes, otimizações automáticas |
| Styling | Tailwind CSS v3 | Desenvolvimento rápido, mobile-first |
| Animações | Framer Motion | Transições suaves entre perguntas |
| Ícones | Lucide React | Leve, tree-shakeable |
| Fonte | Inter via `next/font/google` | Zero layout shift |
| Banco de dados | Supabase (PostgreSQL) | Free tier, SDK JS nativo, real-time opcional |
| ORM/Client | `@supabase/supabase-js` | Client oficial, tipado |
| Deploy | Vercel | CI/CD automático via GitHub, preview por PR |
| Analytics | Vercel Analytics | Pageviews, sem cookies |

### 9.2 Estrutura de Pastas

```
/
├── app/
│   ├── layout.tsx              # Layout global: fonte, metadata, Analytics
│   ├── page.tsx                # Tela de boas-vindas
│   ├── favicon.ico             # Ícone Claude simplificado
│   └── quiz/
│       └── page.tsx            # Lógica principal do quiz (client component)
│   └── api/
│       └── results/
│           └── route.ts        # POST /api/results — salva resultado no Supabase
├── components/
│   ├── WelcomeScreen.tsx       # Tela inicial
│   ├── QuestionCard.tsx        # Card de pergunta + botões V/F
│   ├── FeedbackBox.tsx         # Caixa de explicação pós-resposta
│   ├── ProgressBar.tsx         # Barra de progresso (X/10)
│   ├── ResultScreen.tsx        # Tela de resultado final
│   └── DifficultyBadge.tsx     # Badge 🟢🟡🔴
├── lib/
│   └── supabase.ts             # Cliente Supabase (server + client)
├── data/
│   └── questions.ts            # Array tipado com as 10 perguntas
├── types/
│   └── quiz.ts                 # Tipos TypeScript compartilhados
└── public/
    └── claude-logo.svg         # Logo Claude/Anthropic
```

### 9.3 Tipos TypeScript

```typescript
// types/quiz.ts

type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  id: number;
  statement: string;
  answer: boolean;           // true = Verdadeiro
  explanation: string;
  difficulty: Difficulty;
}

interface QuizState {
  currentIndex: number;
  answers: (boolean | null)[];
  score: number;
  phase: 'welcome' | 'question' | 'feedback' | 'result';
}

interface QuizResult {
  score: number;             // 0–10
  badge: string;             // ex: "Claude Master"
  completed_at: string;      // ISO timestamp
  answers_snapshot: boolean[]; // respostas dadas pelo usuário
}
```

### 9.4 Gerenciamento de Estado
- `useState` + `useReducer` no client component `app/quiz/page.tsx`
- Sem Redux ou Zustand — escopo simples não justifica
- Resultado enviado via `fetch('/api/results', { method: 'POST' })` ao fim do quiz (fire-and-forget — não bloqueia a UI)

### 9.5 Responsividade
- Mobile-first: quiz funciona perfeitamente em celular (375px+)
- Breakpoints: `sm` (640px), `md` (768px)
- Botões V/F: lado a lado no desktop, empilhados no mobile

---

## 10. Banco de Dados — Supabase

### 10.1 Configuração Inicial
1. Criar projeto no [supabase.com](https://supabase.com) (free tier)
2. Copiar `SUPABASE_URL` e `SUPABASE_ANON_KEY` do painel
3. Adicionar as variáveis no Vercel (Settings → Environment Variables)

### 10.2 Schema SQL

```sql
-- Tabela para armazenar cada tentativa do quiz
CREATE TABLE quiz_results (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  score       SMALLINT NOT NULL CHECK (score >= 0 AND score <= 10),
  badge       TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  answers_snapshot BOOLEAN[] NOT NULL  -- array com as 10 respostas do usuário
);

-- Índice para consultas por data (útil para analytics futuros)
CREATE INDEX idx_quiz_results_completed_at ON quiz_results (completed_at DESC);
```

> **Nota:** Não há coleta de dados pessoais (sem nome, e-mail, IP). LGPD-safe por padrão.

### 10.3 API Route — Salvar Resultado

```typescript
// app/api/results/route.ts
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { score, badge, answers_snapshot } = body

  const supabase = createClient()
  const { error } = await supabase
    .from('quiz_results')
    .insert({ score, badge, answers_snapshot })

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  return NextResponse.json({ ok: true }, { status: 201 })
}
```

### 10.4 Variáveis de Ambiente

```env
# .env.local (nunca commitar no git)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
```

Adicionar também no painel da Vercel em **Settings → Environment Variables** para os ambientes `Production` e `Preview`.

---

## 11. Deploy & CI/CD

### 11.1 Plataforma: Vercel

| Item | Configuração |
|------|-------------|
| Plataforma | Vercel (free tier) |
| URL de produção | `<projeto>.vercel.app` |
| Branch de produção | `main` |
| Preview deployments | Automático para cada PR |
| Node.js | 20.x (LTS) |
| Build command | `next build` |
| Output directory | `.next` |

### 11.2 Fluxo de CI/CD

```
[Push para branch feature/X]
  → Vercel gera Preview URL automaticamente
  → Testar na Preview URL

[Merge para main]
  → Build automático na Vercel
  → Deploy para produção em <projeto>.vercel.app
  → Vercel Analytics começa a coletar dados
```

### 11.3 Passos de Setup (uma única vez)

1. Criar repositório no GitHub
2. Conectar repo ao projeto Vercel (vercel.com/import)
3. Adicionar variáveis de ambiente no painel da Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Rodar o SQL de schema no Supabase SQL Editor
5. Fazer push da branch `main` → primeiro deploy automático

### 11.4 `.gitignore` obrigatório

```
.env.local
.env*.local
.next/
node_modules/
```

---

## 12. Monitoramento & Observabilidade

### 12.1 Vercel Analytics
- Ativar em: Vercel Dashboard → projeto → Analytics → Enable
- Adicionar no `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'
// <Analytics /> no return do layout
```
- Métricas coletadas: pageviews, unique visitors, países, dispositivos
- Sem cookies, LGPD-compliant

### 12.2 Erros
- Erros de save no Supabase são silenciosos para o usuário (fire-and-forget)
- Logar no console do servidor para visibilidade nos logs da Vercel
- Vercel Dashboard → Logs mostra erros em produção em tempo real

---

## 13. Requisitos Não-Funcionais

| Requisito | Critério |
|-----------|----------|
| Performance | Lighthouse score ≥ 90 (Performance, Acessibilidade) |
| Acessibilidade | Navegação por teclado, contraste WCAG AA |
| Responsividade | Funciona em mobile (375px+) e desktop |
| Confiabilidade | Save no Supabase fire-and-forget — falha não quebra o quiz |
| Privacidade | Sem dados pessoais coletados — LGPD-safe |
| Tempo de carregamento | First Contentful Paint < 1.5s |
| SEO | Indexável pelo Google (SSR via Next.js) |

---

## 14. Critérios de Aceitação (Definition of Done)

**Funcionalidades:**
- [ ] Tela de boas-vindas com título, descrição e botão de início
- [ ] 10 perguntas exibidas sequencialmente com barra de progresso
- [ ] Botões V/F desabilitados após resposta (sem troca)
- [ ] Feedback visual imediato (verde/vermelho) + explicação textual
- [ ] Tela de resultado com pontuação, badge/título e botão de reinício

**Banco de dados:**
- [ ] Tabela `quiz_results` criada no Supabase
- [ ] Resultado salvo silenciosamente ao fim do quiz
- [ ] Falha no save não impede exibição do resultado ao usuário

**Deploy:**
- [ ] Repositório no GitHub
- [ ] Projeto conectado à Vercel
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] URL de produção `*.vercel.app` funcionando
- [ ] Preview deployments funcionando por PR

**Qualidade:**
- [ ] Design fiel à identidade visual Anthropic/Claude
- [ ] Responsivo em mobile e desktop
- [ ] Sem dados pessoais coletados (LGPD-safe)
- [ ] `.env.local` fora do git

---

## 15. Fora de Escopo (v1)

- Sistema de login ou autenticação
- Ranking/leaderboard público entre usuários
- Perguntas de múltipla escolha
- Timer por pergunta
- Compartilhamento de resultado em redes sociais
- Internacionalização (i18n)
- Dashboard de analytics personalizado
- Domínio customizado (usar `.vercel.app`)

---

*Documento gerado em: 2026-04-26 | Versão: 1.1*
