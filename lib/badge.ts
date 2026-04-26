export function getBadge(score: number): string {
  if (score === 10) return 'Claude Master 🏆'
  if (score >= 7) return 'Claude Especialista ⚡'
  if (score >= 4) return 'Claude Explorador 🔍'
  return 'Claude Curioso 🌱'
}
