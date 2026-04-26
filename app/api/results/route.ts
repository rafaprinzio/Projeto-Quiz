import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { score, badge, answers_snapshot } = body

  if (
    typeof score !== 'number' ||
    score < 0 ||
    score > 10 ||
    typeof badge !== 'string' ||
    badge.length === 0 ||
    !Array.isArray(answers_snapshot) ||
    answers_snapshot.length !== 10
  ) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const supabase = createClient()
  const { error } = await supabase
    .from('quiz_results')
    .insert({ score, badge, answers_snapshot })

  if (error) {
    console.error('[api/results]', error.message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
