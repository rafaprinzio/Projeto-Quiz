'use client'

import { useReducer, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { QuizState } from '@/types/quiz'
import { questions } from '@/data/questions'
import { getBadge } from '@/lib/badge'
import QuestionCard from '@/components/QuestionCard'
import ResultScreen from '@/components/ResultScreen'

type Action =
  | { type: 'ANSWER'; payload: boolean }
  | { type: 'NEXT' }
  | { type: 'RETRY' }

const initialState: QuizState = {
  currentIndex: 0,
  answers: Array(10).fill(null),
  score: 0,
  phase: 'question',
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'ANSWER': {
      const isCorrect = action.payload === questions[state.currentIndex].answer
      return {
        ...state,
        answers: state.answers.map((a, i) =>
          i === state.currentIndex ? action.payload : a,
        ),
        score: isCorrect ? state.score + 1 : state.score,
        phase: 'feedback',
      }
    }
    case 'NEXT': {
      if (state.currentIndex < questions.length - 1) {
        return { ...state, currentIndex: state.currentIndex + 1, phase: 'question' }
      }
      return { ...state, phase: 'result' }
    }
    case 'RETRY':
      return initialState
    default:
      return state
  }
}

export default function QuizPage() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Fire-and-forget: save result when quiz ends
  useEffect(() => {
    if (state.phase !== 'result') return
    fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: state.score,
        badge: getBadge(state.score),
        answers_snapshot: state.answers,
      }),
    }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase])

  if (state.phase === 'result') {
    return (
      <ResultScreen state={state} onRetry={() => dispatch({ type: 'RETRY' })} />
    )
  }

  const question = questions[state.currentIndex]

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <QuestionCard
              question={question}
              phase={state.phase}
              userAnswer={state.answers[state.currentIndex]}
              onAnswer={(answer) => dispatch({ type: 'ANSWER', payload: answer })}
              onNext={() => dispatch({ type: 'NEXT' })}
              questionNumber={state.currentIndex + 1}
              totalQuestions={questions.length}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
