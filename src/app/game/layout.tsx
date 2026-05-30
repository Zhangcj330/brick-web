import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brick Gatekeeper Game',
  description: 'Can you get past the Brick AI gatekeeper? A fun challenge for first-home buyers.',
  robots: { index: false, follow: false },
}

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return children
}
