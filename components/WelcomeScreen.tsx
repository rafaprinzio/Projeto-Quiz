import Link from 'next/link'
import { Clock, Zap } from 'lucide-react'

export default function WelcomeScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-claude-primary flex items-center justify-center mx-auto shadow-card">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm font-semibold text-claude-primary uppercase tracking-widest">
            Claude Code
          </p>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-claude-text leading-tight">
            Quanto você sabe sobre o Claude Code?
          </h1>
          <p className="text-claude-muted text-base md:text-lg leading-relaxed">
            10 perguntas de{' '}
            <span className="font-semibold text-claude-text">Verdadeiro ou Falso</span>{' '}
            com feedback instantâneo. Descubra o quanto você conhece a CLI agentic da Anthropic.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-claude-muted">
          <Clock className="w-4 h-4" />
          <span>~3 minutos · 10 questões</span>
        </div>

        <Link
          href="/quiz"
          className="inline-block w-full py-4 px-8 bg-claude-primary text-white font-bold text-lg rounded-[8px] hover:opacity-90 active:scale-95 transition-all shadow-card"
        >
          Iniciar Quiz →
        </Link>

        <p className="text-xs text-claude-muted">
          Sem cadastro. Sem dados pessoais coletados.
        </p>
      </div>
    </main>
  )
}
