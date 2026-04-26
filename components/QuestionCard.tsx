import { motion, AnimatePresence } from 'framer-motion'
import type { Question } from '@/types/quiz'
import ProgressBar from './ProgressBar'
import DifficultyBadge from './DifficultyBadge'
import FeedbackBox from './FeedbackBox'

interface QuestionCardProps {
  question: Question
  phase: 'question' | 'feedback'
  userAnswer: boolean | null
  onAnswer: (answer: boolean) => void
  onNext: () => void
  questionNumber: number
  totalQuestions: number
}

function getButtonStyle(
  buttonValue: boolean,
  userAnswer: boolean | null,
  correctAnswer: boolean,
  phase: 'question' | 'feedback',
): string {
  const base =
    'flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-[8px] font-bold text-base transition-all duration-200 disabled:cursor-not-allowed'

  if (phase === 'question') {
    return `${base} bg-white border-2 border-black/10 text-claude-text hover:border-claude-primary hover:text-claude-primary`
  }

  if (userAnswer === buttonValue) {
    const isCorrect = buttonValue === correctAnswer
    return isCorrect
      ? `${base} bg-claude-success text-white border-2 border-claude-success`
      : `${base} bg-claude-error text-white border-2 border-claude-error`
  }

  return `${base} bg-white border-2 border-black/10 text-claude-muted opacity-50`
}

export default function QuestionCard({
  question,
  phase,
  userAnswer,
  onAnswer,
  onNext,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-[12px] shadow-card p-6 md:p-8 space-y-6 w-full">
      <ProgressBar current={questionNumber} total={totalQuestions} />

      <div className="flex items-center justify-between">
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      <p className="text-claude-text text-lg md:text-xl font-medium leading-relaxed">
        {question.statement}
      </p>

      <div className="flex flex-col md:flex-row gap-3">
        {([true, false] as const).map((value) => {
          const isAnswered = phase === 'feedback'
          const isCorrect = isAnswered && userAnswer === value && value === question.answer
          const isWrong = isAnswered && userAnswer === value && value !== question.answer

          return (
            <button
              key={String(value)}
              onClick={() => onAnswer(value)}
              disabled={isAnswered}
              className={getButtonStyle(value, userAnswer, question.answer, phase)}
              aria-label={value ? 'Verdadeiro' : 'Falso'}
            >
              {isCorrect && <span aria-hidden="true">✓</span>}
              {isWrong && <span aria-hidden="true">✗</span>}
              {value ? 'VERDADEIRO' : 'FALSO'}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {phase === 'feedback' && userAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <FeedbackBox
              isCorrect={userAnswer === question.answer}
              explanation={question.explanation}
            />
            <button
              onClick={onNext}
              className="w-full py-3 px-6 bg-claude-primary text-white font-semibold rounded-[8px] hover:opacity-90 transition-opacity"
            >
              Próxima Pergunta →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
