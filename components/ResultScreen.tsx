import { CheckCircle, XCircle } from 'lucide-react'
import type { QuizState } from '@/types/quiz'
import { questions } from '@/data/questions'
import { getBadge } from '@/lib/badge'

interface ResultScreenProps {
  state: QuizState
  onRetry: () => void
}

export default function ResultScreen({ state, onRetry }: ResultScreenProps) {
  const badge = getBadge(state.score)

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-6">
        {/* Score card */}
        <div className="bg-white rounded-[12px] shadow-card p-8 text-center space-y-4">
          <p className="text-5xl font-bold text-claude-primary">
            {state.score}
            <span className="text-2xl text-claude-muted font-normal">/10</span>
          </p>
          <p className="text-claude-text font-medium text-lg">
            Você acertou {state.score} de 10 perguntas
          </p>
          <div className="inline-block bg-claude-bg px-6 py-3 rounded-full">
            <p className="text-2xl font-bold text-claude-text">{badge}</p>
          </div>
        </div>

        {/* Per-question summary */}
        <div className="bg-white rounded-[12px] shadow-card divide-y divide-black/5">
          {questions.map((q, i) => {
            const userAns = state.answers[i]
            const correct = userAns === q.answer
            return (
              <div key={q.id} className="flex items-start gap-3 px-5 py-4">
                {correct ? (
                  <CheckCircle className="w-5 h-5 text-claude-success shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-claude-error shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-claude-muted mb-0.5">Pergunta {q.id}</p>
                  <p className="text-sm text-claude-text leading-snug line-clamp-2">
                    {q.statement}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={onRetry}
          className="w-full py-4 px-8 bg-claude-primary text-white font-bold text-lg rounded-[8px] hover:opacity-90 active:scale-95 transition-all shadow-card"
        >
          Tentar Novamente
        </button>
      </div>
    </main>
  )
}
