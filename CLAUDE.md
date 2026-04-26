# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This project is **spec-ready but not yet initialized**. The full specification lives in [prd.md](prd.md). No Next.js project has been scaffolded yet.

To bootstrap:
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=no --import-alias="@/*"
npm install framer-motion lucide-react @supabase/supabase-js @vercel/analytics
```

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Architecture

**Stack:** Next.js 14+ (App Router) · Tailwind CSS v3 · Framer Motion · Supabase (PostgreSQL) · Vercel

### Folder structure (to be created per PRD)

```
app/
  layout.tsx          # Global layout: Inter font, metadata, <Analytics />
  page.tsx            # Welcome screen (server component, renders <WelcomeScreen>)
  quiz/page.tsx       # All quiz logic — single client component with useState/useReducer
  api/results/route.ts  # POST only — inserts row into quiz_results, fire-and-forget
components/
  WelcomeScreen.tsx
  QuestionCard.tsx    # Renders statement + VERDADEIRO/FALSO buttons; disables after answer
  FeedbackBox.tsx     # Shown after answer: correct/incorrect color + explanation text
  ProgressBar.tsx     # "X/10" indicator
  ResultScreen.tsx    # Final score, badge, per-question summary, retry button
  DifficultyBadge.tsx # 🟢🟡🔴 based on difficulty field
data/questions.ts     # Array of 10 typed Question objects (never fetched from DB)
types/quiz.ts         # Shared types (see below)
lib/supabase.ts       # Supabase client init (server-side only in API route)
```

### Key types (`types/quiz.ts`)

```typescript
type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  id: number;
  statement: string;
  answer: boolean;        // true = Verdadeiro
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
  score: number;
  badge: string;
  completed_at: string;
  answers_snapshot: boolean[];
}
```

### State management

All state lives in `app/quiz/page.tsx` via `useState`/`useReducer`. No external state library. The result is sent via `fetch('/api/results', { method: 'POST' })` as fire-and-forget at the end of the quiz — a failure must never block the result screen from rendering.

### Supabase schema

```sql
CREATE TABLE quiz_results (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  score            SMALLINT NOT NULL CHECK (score >= 0 AND score <= 10),
  badge            TEXT NOT NULL,
  completed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  answers_snapshot BOOLEAN[] NOT NULL
);
CREATE INDEX idx_quiz_results_completed_at ON quiz_results (completed_at DESC);
```

## Design tokens

| Token | Value |
|---|---|
| Primary (Claude orange) | `#D97757` |
| Background | `#F5F0E8` |
| Text primary | `#1A1A1A` |
| Text secondary | `#6B6B6B` |
| Success | `#16A34A` |
| Error | `#DC2626` |
| Card border-radius | `12px` |
| Button border-radius | `8px` |
| Card shadow | `0 2px 12px rgba(0,0,0,0.08)` |

Font: Inter via `next/font/google`.  
Buttons V/F: side-by-side on desktop, stacked on mobile (375px+). After answering, buttons are disabled — correct turns green with ✓, incorrect turns red with ✗.

## Badge thresholds

| Score | Badge |
|---|---|
| 0–3 | Claude Curioso 🌱 |
| 4–6 | Claude Explorador 🔍 |
| 7–9 | Claude Especialista ⚡ |
| 10 | Claude Master 🏆 |

## Environment variables

```env
# .env.local — never commit
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
```

Same variables must be set in Vercel → Settings → Environment Variables for Production and Preview environments.

## Out of scope (v1)

Login, leaderboard, multiple-choice questions, per-question timer, social sharing, i18n, custom domain, analytics dashboard.
