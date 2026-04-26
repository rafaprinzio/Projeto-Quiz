export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: number
  statement: string
  answer: boolean
  explanation: string
  difficulty: Difficulty
}

export interface QuizState {
  currentIndex: number
  answers: (boolean | null)[]
  score: number
  phase: 'question' | 'feedback' | 'result'
}

export interface QuizResult {
  score: number
  badge: string
  completed_at: string
  answers_snapshot: boolean[]
}
