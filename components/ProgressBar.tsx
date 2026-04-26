interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm font-medium text-claude-muted">
        <span>Pergunta {current} de {total}</span>
        <span>{pct}%</span>
      </div>
      <div
        className="w-full h-2 bg-black/10 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Pergunta ${current} de ${total}`}
      >
        <div
          className="h-full bg-claude-primary rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
