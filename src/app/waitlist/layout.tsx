import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account — Brick AI',
  description: "Sign up for Brick AI — the AI buyer's agent helping first-home buyers in Australia buy with confidence.",
  alternates: { canonical: 'https://thebrickai.com/sign-up' },
  openGraph: {
    title: 'Create Account — Brick AI',
    description: "Sign up for Brick AI — the AI buyer's agent for first-home buyers in Australia.",
    url: 'https://thebrickai.com/sign-up',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Account — Brick AI',
    description: "Sign up for Brick AI — the AI buyer's agent for first-home buyers in Australia.",
  },
}

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
