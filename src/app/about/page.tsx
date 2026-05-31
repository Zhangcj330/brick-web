import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About Brick AI — AI Buyer\'s Agent for First-Home Buyers',
  description: 'Brick AI is the AI buyer's agent for first-home buyers in Australia. We help you buy with clarity, data, and confidence — no commissions, no conflict of interest.',
  alternates: { canonical: 'https://thebrickai.com/about' },
  openGraph: {
    title: 'About — Brick AI',
    description: 'Brick AI is the AI buyer's agent for first-home buyers in Australia. We help you buy with clarity, data, and confidence — no commissions, no conflict of interest.',
    url: 'https://thebrickai.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Brick AI',
    description: 'Brick AI is the AI buyer's agent for first-home buyers in Australia. We help you buy with clarity, data, and confidence — no commissions, no conflict of interest.',
  },
}

const VALUES = [
  {
    title: 'Clarity over complexity',
    desc: 'Australian property is one of the most stressful financial decisions a person will ever make. We strip away the noise and give you what matters.',
  },
  {
    title: 'Data you can trust',
    desc: 'Every insight is backed by real market data — suburb medians, clearance rates, comparable sales, and government grant eligibility.',
  },
  {
    title: 'Built for first-timers',
    desc: "We don't assume you know what a Section 32 is. Brick AI meets you where you are and guides you every step of the way.",
  },
  {
    title: 'No commissions, ever',
    desc: "We're not a real estate agent. We have no incentive to push you toward any property. Our only job is to help you buy right.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-[66px]">

        {/* Hero */}
        <section className="bg-black text-white py-24 md:py-32">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-6">About Brick AI</p>
            <h1 className="text-[48px] md:text-[72px] font-black leading-[1.0] tracking-[-0.03em] max-w-3xl mb-8">
              We built the AI buyer's agent<br />first-home buyers deserve.
            </h1>
            <p className="text-[#AFAFAF] text-lg leading-relaxed max-w-xl">
              Australia has one of the world&apos;s most competitive property markets. First-home buyers are navigating it alone — outgunned by investors, overwhelmed by jargon, and underserved by technology. Brick AI changes that.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 border-b border-[#EEEEEE]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-4">Our mission</p>
              <h2 className="text-4xl font-black tracking-tight leading-tight mb-6">
                Make buying your first home feel possible.
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                We started Brick AI because buying a first home in Australia is unnecessarily hard. The market moves fast, the data is scattered, and the people who should be helping you often have their own interests at heart.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Brick AI is an AI buyer's agent that gives first-home buyers the clarity, data, and negotiation edge to buy confidently — without the guesswork, without the jargon, and without the conflict of interest.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '50k+', label: 'Homes analysed' },
                { num: '$18k', label: 'Avg. savings found' },
                { num: '4.9★', label: 'Beta rating' },
                { num: '3 min', label: 'Time to first insight' },
              ].map(s => (
                <div key={s.label} className="border border-[#EEEEEE] rounded-2xl p-6">
                  <div className="text-3xl font-black tracking-tight mb-1">{s.num}</div>
                  <div className="text-sm text-[#6B6B6B]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 border-b border-[#EEEEEE]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-4">What we stand for</p>
            <h2 className="text-4xl font-black tracking-tight mb-12">Our principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VALUES.map((v, i) => (
                <div key={v.title} className="flex gap-5">
                  <span className="text-xs font-bold text-[#AFAFAF] mt-1 w-5 shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-base mb-2">{v.title}</h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we're building */}
        <section className="py-20 border-b border-[#EEEEEE]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-4">What we&apos;re building</p>
            <h2 className="text-4xl font-black tracking-tight mb-6">An end-to-end home buying companion.</h2>
            <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
              <p>Brick AI analyses suburb trends, runs comparable sales reports, calculates your borrowing power, checks grant eligibility, and helps you prepare for negotiations — all in one place, in plain English.</p>
              <p>We&apos;re currently in closed beta with a small group of first-home buyers across Sydney, Melbourne, and Brisbane. Every conversation makes Brick smarter.</p>
              <p>We&apos;re not a mortgage broker. Not a buyer&apos;s agent. Not a real estate portal. We&apos;re the tool that helps you make sense of all of them.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
            <h2 className="text-4xl font-black tracking-tight mb-4">Ready to buy with confidence?</h2>
            <p className="text-[#6B6B6B] mb-8">Join thousands of first-home buyers on the waitlist.</p>
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 bg-black text-white font-bold px-8 py-4 rounded-full hover:bg-[#333] transition-colors"
            >
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
