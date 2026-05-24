import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brick AI — The AI co-pilot for first-home buyers',
  description: 'Brick AI gives first-home buyers the clarity, data, and negotiation edge to buy right.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
