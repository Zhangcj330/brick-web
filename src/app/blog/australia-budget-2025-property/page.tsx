import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const metadata = {
  title: "Australia's 2026 Federal Budget: What It Means for First-Home Buyers — Brick AI",
  description: "The 2026 Federal Budget delivered housing supply measures and demand-side support. We break down what actually matters if you're trying to buy your first home.",
}

export default function BlogPost() {
  return (
    <>
      <Nav />
      <main className="pt-[66px]">

        {/* Header */}
        <section className="border-b border-[#EEEEEE] py-16 bg-[#F6F6F6]">
          <div className="max-w-[720px] mx-auto px-6 md:px-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-black transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold bg-white border border-[#EEEEEE] px-2.5 py-1 rounded-full">Market Analysis</span>
              <span className="text-xs text-[#AFAFAF]">6 min read · 24 May 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
              Australia&apos;s 2025 Federal Budget: What It Means for First-Home Buyers
            </h1>
            <p className="text-[#6B6B6B] text-lg leading-relaxed">
              The 2026 Federal Budget delivered a mix of housing supply measures and demand-side support. We break down what actually matters if you&apos;re trying to buy your first home this year.
            </p>
          </div>
        </section>

        {/* Article body */}
        <article className="py-16">
          <div className="max-w-[720px] mx-auto px-6 md:px-10 space-y-8 text-[#3A3A3A]">

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">The big picture</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The Albanese government&apos;s 2026–27 Federal Budget continued its focus on housing affordability — a persistent sore point for younger Australians locked out of the property market. With median house prices in Sydney exceeding $1.6M and Melbourne above $900k, the budget measures are welcome, but the question is whether they&apos;re enough.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                Here&apos;s what was announced, and more importantly, what it means in practice if you&apos;re a first-home buyer looking to enter the market in 2026.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">1. Help to Buy scheme — expanded</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The government&apos;s shared equity scheme, <strong>Help to Buy</strong>, was allocated additional funding to expand its reach. Under the scheme, the federal government co-purchases a home with eligible buyers — contributing up to 40% of the purchase price for new builds and 30% for existing homes.
              </p>
              <div className="bg-[#F6F6F6] rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold mb-2">Key eligibility (2026 update):</p>
                <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc pl-4">
                  <li>Income cap: $90,000 for singles, $120,000 for couples</li>
                  <li>Property price caps apply by state (e.g. up to $950k in Sydney)</li>
                  <li>Must be an Australian citizen or permanent resident</li>
                  <li>Must not currently own property</li>
                </ul>
              </div>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                <strong>What this means for you:</strong> If you qualify, the scheme dramatically reduces the deposit you need. A 2% deposit on a $900k home is $18,000 — compared to the typical $180,000 (20%) needed to avoid LMI. The catch: the government owns a stake in your home and shares in any capital gain.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">2. Housing supply — $32 billion commitment</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The budget reaffirmed the government&apos;s Housing Australia Future Fund target of <strong>1.2 million new homes by 2029</strong>, backed by $32 billion in commitments across construction incentives, social housing, and infrastructure funding for greenfield development.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                In practice, new supply takes 2–4 years to reach the market. For buyers looking to purchase in 2026–27, this won&apos;t ease price pressure in the short term — especially in inner-ring suburbs with planning restrictions.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                However, outer suburban and regional markets attached to growth corridors (e.g. Western Sydney around the new airport, southeast Queensland, outer Melbourne) may see increased supply and more competitive pricing within 18–24 months.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">3. First Home Guarantee — continuing strong</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The <strong>First Home Guarantee</strong> (formerly FHLDS) — which allows eligible buyers to purchase with a 5% deposit without paying Lenders Mortgage Insurance — continues with 35,000 places per financial year. The Regional First Home Buyer Guarantee also continues with 10,000 additional places for regional purchases.
              </p>
              <div className="bg-[#F6F6F6] rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold mb-2">2026–27 price caps (selected cities):</p>
                <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc pl-4">
                  <li>Sydney / NSW: $900,000</li>
                  <li>Melbourne / VIC: $800,000</li>
                  <li>Brisbane / QLD: $700,000</li>
                  <li>Perth / WA: $600,000</li>
                  <li>Adelaide / SA: $600,000</li>
                </ul>
              </div>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                <strong>Important:</strong> These caps are lower than median prices in many of these cities, which limits the scheme&apos;s reach in premium suburbs. First-home buyers in Sydney, for example, are effectively steered toward apartments or outer suburbs.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">4. Interest rate outlook — the real driver</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The budget operates in the context of the RBA&apos;s rate cycle. After cutting rates in February 2026 for the first time since 2020, the RBA held at its May meeting. Markets are pricing in 1–2 further cuts by end of 2026.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                Each 0.25% rate cut increases borrowing capacity by approximately 2–3%. If rates fall by 0.75% by year-end, a household with $120k combined income could borrow an additional $30,000–$45,000. That matters at this end of the market.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                The flip side: rate cuts typically push prices up in already supply-constrained markets. Buyers who wait for rates to fall further may find that any savings in repayments are offset by higher purchase prices.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">5. Negative gearing and CGT — unchanged</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                Despite ongoing debate, the government made no changes to negative gearing or the capital gains tax (CGT) discount in this budget. Investors retain their structural tax advantages over owner-occupiers — meaning competition for established housing stock remains intense.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                For first-home buyers, this reinforces the importance of targeting new builds (which qualify for higher grant thresholds and stamp duty concessions in most states) or off-market properties where investor competition is lower.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">Bottom line for first-home buyers</h2>
              <div className="space-y-4">
                {[
                  { emoji: '✅', text: 'Help to Buy and the First Home Guarantee are genuine tools — check your eligibility before you rule them out.' },
                  { emoji: '⚠️', text: 'Supply-side measures will take years to flow through. Don\'t count on falling prices in established inner suburbs.' },
                  { emoji: '📉', text: 'Rate cuts are coming but are already partially priced into the market. Don\'t wait for perfection.' },
                  { emoji: '🔍', text: 'The best opportunities remain in suburbs where fundamentals (yield, infrastructure, employment) are strong but media attention is low.' },
                ].map(item => (
                  <div key={item.emoji} className="flex gap-3 bg-[#F6F6F6] rounded-xl p-4">
                    <span className="text-xl shrink-0">{item.emoji}</span>
                    <p className="text-sm text-[#3A3A3A] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </article>

        {/* CTA */}
        <section className="border-t border-[#EEEEEE] py-16 bg-[#F6F6F6]">
          <div className="max-w-[720px] mx-auto px-6 md:px-10 text-center">
            <h2 className="text-3xl font-black tracking-tight mb-3">Want personalised insights for your suburb?</h2>
            <p className="text-[#6B6B6B] mb-8">Brick AI analyses market data so you can buy with confidence. Join the waitlist for early access.</p>
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
