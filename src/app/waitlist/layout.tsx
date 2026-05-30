import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist',
  description:
    'Get early access to Brick AI — the AI co-pilot helping first-home buyers in Australia buy with confidence. Join thousands already on the waitlist.',
  alternates: { canonical: 'https://thebrickai.com/waitlist' },
  openGraph: {
    title: 'Join the Waitlist — Brick AI',
    description:
      'Get early access to Brick AI — the AI co-pilot helping first-home buyers in Australia buy with confidence.',
    url: 'https://thebrickai.com/waitlist',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brick AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Waitlist — Brick AI',
    description:
      'Get early access to Brick AI — the AI co-pilot helping first-home buyers in Australia buy with confidence.',
    images: ['/og-image.png'],
  },
}

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
