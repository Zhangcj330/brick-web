import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Brick AI — The AI buyer's agent for first-home buyers',
  description:
    'Brick AI gives first-home buyers the clarity, data, and negotiation edge to buy right — without the guesswork. Analyse suburbs, check grants, and buy with confidence.',
  alternates: { canonical: 'https://thebrickai.com' },
  openGraph: {
    title: 'Brick AI — The AI buyer's agent for first-home buyers',
    description:
      'Brick AI gives first-home buyers the clarity, data, and negotiation edge to buy right — without the guesswork.',
    url: 'https://thebrickai.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brick AI — The AI buyer's agent for first-home buyers',
    description:
      'Brick AI gives first-home buyers the clarity, data, and negotiation edge to buy right — without the guesswork.',
  },
}

import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import CtaStrip from '@/components/CtaStrip'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CtaStrip />
      </main>
      <Footer />
    </>
  )
}
