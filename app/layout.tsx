import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiz Claude Code — Quanto você sabe?',
  description:
    'Teste seus conhecimentos sobre o Claude Code da Anthropic em 10 perguntas de verdadeiro ou falso.',
  keywords: ['Claude Code', 'Anthropic', 'IA', 'quiz', 'Claude AI'],
  openGraph: {
    title: 'Quiz Claude Code',
    description: 'Você conhece o Claude Code? Faça o quiz e descubra!',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-claude-bg text-claude-text min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
