import { CheckCircle, XCircle } from 'lucide-react'

interface FeedbackBoxProps {
  isCorrect: boolean
  explanation: string
}

export default function FeedbackBox({ isCorrect, explanation }: FeedbackBoxProps) {
  return (
    <div
      className={`rounded-[12px] border-l-4 p-4 ${
        isCorrect
          ? 'border-claude-success bg-green-50'
          : 'border-claude-error bg-red-50'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {isCorrect ? (
          <CheckCircle className="w-5 h-5 text-claude-success shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-claude-error shrink-0" />
        )}
        <span
          className={`font-semibold text-sm ${
            isCorrect ? 'text-claude-success' : 'text-claude-error'
          }`}
        >
          {isCorrect ? 'Correto!' : 'Incorreto!'}
        </span>
      </div>
      <p className="text-sm text-claude-muted leading-relaxed">{explanation}</p>
    </div>
  )
}
