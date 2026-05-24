import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brick AI — The AI co-pilot for first-home buyers',
  description: 'Brick AI gives first-home buyers the clarity, data, and negotiation edge to buy right — without the guesswork.',
  icons: {
    icon: '/logo-on-black.svg',
    shortcut: '/logo-on-black.svg',
    apple: '/logo-on-black.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hanken.variable}>
      <body className={hanken.className}>{children}</body>
    </html>
  )
}
