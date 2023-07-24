import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '홀리몰리 과카몰입',
  description: '밸런스 게임 기반 토론 커뮤니티 서비스입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <body className={`${inter.className} bg-yellow-light flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
