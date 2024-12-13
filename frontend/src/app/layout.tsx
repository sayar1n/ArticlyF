import type { Metadata } from 'next'
import { JetBrains_Mono, Nunito_Sans } from 'next/font/google'
import '@/app/styles/globals.scss'

const nunitoSans = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={nunitoSans.className}>{children}</body>
      </html>
  )
}