import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist',
  description:
    "Get early access to Brick AI — the AI buyer's agent helping first-home buyers in Australia buy with confidence. Join thousands already on the waitlist.",
  alternates: { canonical: 'https://thebrickai.com/waitlist' },
  openGraph: {
    title: 'Join the Waitlist — Brick AI',
    description:
      "Get early access to Brick AI — the AI buyer's agent helping first-home buyers in Australia buy with confidence.",
    url: 'https://thebrickai.com/waitlist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Waitlist — Brick AI',
    description:
      "Get early access to Brick AI — the AI buyer's agent helping first-home buyers in Australia buy with confidence.",
  },
}

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
