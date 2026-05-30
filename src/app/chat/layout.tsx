import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brick AI · Buyer Agent',
  description: "Your AI-powered buyer's agent",
  robots: { index: false, follow: false },
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children
}
