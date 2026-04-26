import type { Difficulty } from '@/types/quiz'

const config: Record<Difficulty, { label: string; dot: string }> = {
  easy:   { dot: '🟢', label: 'Fácil' },
  medium: { dot: '🟡', label: 'Médio' },
  hard:   { dot: '🔴', label: 'Avançado' },
}

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { dot, label } = config[difficulty]
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-claude-muted bg-black/5 px-2.5 py-1 rounded-full">
      <span aria-hidden="true">{dot}</span>
      {label}
    </span>
  )
}
