import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const metadata = {
  title: "Australia's 2026-27 Federal Budget: What It Means for First-Home Buyers — Brick AI",
  description: "The 2026-27 Federal Budget delivered landmark housing reforms — negative gearing changes, CGT overhaul, $47 billion in housing investment, and a rate rise. Here's what it means for first-home buyers.",
  openGraph: {
    title: "Australia's 2026-27 Federal Budget: What It Means for First-Home Buyers",
    description: "The 2026-27 Federal Budget delivered landmark housing reforms — negative gearing changes, CGT overhaul, $47 billion in housing investment, and a rate rise. Here's what it means for first-home buyers.",
    url: 'https://thebrickai.com/blog/australia-budget-2025-property',
    type: 'article',
    publishedTime: '2026-05-24T00:00:00.000Z',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: "Australia's 2026-27 Federal Budget and first-home buyers — Brick AI" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Australia's 2026-27 Federal Budget: What It Means for First-Home Buyers",
    description: "The 2026-27 Federal Budget delivered landmark housing reforms — negative gearing changes, CGT overhaul, $47 billion in housing investment, and a rate rise.",
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://thebrickai.com/blog/australia-budget-2025-property' },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Australia's 2026-27 Federal Budget: What It Means for First-Home Buyers",
  description:
    "The 2026-27 Federal Budget delivered landmark housing reforms — negative gearing changes, CGT overhaul, $47 billion in housing investment, and a rate rise. Here's what it means for first-home buyers.",
  datePublished: '2026-05-24T00:00:00.000Z',
  dateModified: '2026-05-24T00:00:00.000Z',
  author: { '@type': 'Organization', name: 'Brick AI', url: 'https://thebrickai.com' },
  publisher: {
    '@type': 'Organization',
    name: 'Brick AI',
    logo: { '@type': 'ImageObject', url: 'https://thebrickai.com/logo.svg' },
  },
  image: 'https://thebrickai.com/og-image.png',
  url: 'https://thebrickai.com/blog/australia-budget-2025-property',
  mainEntityOfPage: 'https://thebrickai.com/blog/australia-budget-2025-property',
}

export default function BlogPost() {
  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
              <span className="text-xs text-[#AFAFAF]">24 May 2026 · 7 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
              Australia&apos;s 2026–27 Federal Budget: What It Means for First-Home Buyers
            </h1>
            <p className="text-[#6B6B6B] text-lg leading-relaxed">
              Delivered on 12 May 2026, this budget made the most significant changes to property taxation in a generation — while also landing the same week the RBA raised interest rates. Here&apos;s what actually matters if you&apos;re trying to buy your first home.
            </p>
          </div>
        </section>

        {/* Article body */}
        <article className="py-16">
          <div className="max-w-[720px] mx-auto px-6 md:px-10 space-y-8 text-[#3A3A3A]">

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">The big picture</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                Treasurer Jim Chalmers delivered the 2026–27 Federal Budget on Tuesday 12 May 2026, themed <em>&quot;Resilience and Reform.&quot;</em> The backdrop: an ongoing Middle East conflict driving global oil prices higher, a surprise RBA rate hike just days earlier, and a housing market still deeply out of reach for most young Australians.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                The headline housing commitment is now over <strong>$47 billion</strong> — described by the government as the largest and most comprehensive housing plan Australia has ever seen. But the standout measures are a historic overhaul of negative gearing and capital gains tax, the continued rollout of the 5% deposit program, and a $2 billion local infrastructure fund.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                Here&apos;s what was announced, and what it means in practice for first-home buyers.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">1. Negative gearing reform — restricted to new builds</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                This is the big one. From <strong>1 July 2027</strong>, negative gearing on <strong>established (existing) homes</strong> will be restricted — investors who buy existing homes after 7:30pm AEST on 12 May 2026 (Budget night) will no longer be able to offset rental losses against wages or other non-property income.
              </p>
              <div className="bg-[#F6F6F6] rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold mb-2">What's changing:</p>
                <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc pl-4">
                  <li>Negative gearing on <strong>existing homes</strong> (post-budget night purchases): losses can still be offset against other rental property income or carried forward — but <strong>NOT deductible against wages or salary</strong></li>
                  <li>Negative gearing on <strong>new builds</strong>: unchanged — fully deductible against all income</li>
                  <li>All investments held before 7:30pm AEST 12 May 2026: fully grandfathered, no change ever</li>
                </ul>
              </div>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                <strong>What this means for you:</strong> Investors have a strong incentive to pivot to new builds, which could ease competition on established homes. The government estimates this change will help around <strong>75,000 more Australians</strong> into home ownership over the next decade. However, the full effect won&apos;t be felt until 2027 — so don&apos;t expect an immediate shift in established-home auction clearance rates.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">2. Capital gains tax overhaul — indexation replaces the 50% discount</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                Also from <strong>1 July 2027</strong>, the 50% CGT discount for investment properties will be replaced with <strong>inflation-adjusted indexation</strong> — meaning only <em>real</em> gains (above inflation) will be taxed. A minimum tax rate of 30% on realised gains also applies.
              </p>
              <div className="bg-[#F6F6F6] rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold mb-2">Key details:</p>
                <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc pl-4">
                  <li>Gains accrued on existing investments before the start date retain the 50% discount</li>
                  <li>New homes are exempt — investors buying new builds can choose between the 50% discount or indexation</li>
                  <li>The change is fully prospective — not retrospective</li>
                </ul>
              </div>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                <strong>What this means for you:</strong> By reducing the tax advantage of holding existing investment properties, the reform is designed to level the playing field between investors and owner-occupiers. Combined with the negative gearing change, the government expects to redirect investor demand toward new supply — which is ultimately what first-home buyers need.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">3. The 5% deposit program and Help to Buy — both running</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The government&apos;s <strong>5% Deposit Scheme</strong> (no LMI) and <strong>Help to Buy</strong> shared equity scheme are both live and widely used. Since October 2025, the 5% Deposit Scheme has <strong>no income caps</strong> — anyone buying their first home can apply. The Treasurer noted that more than half of all first home buyers are now entering the market with government support.
              </p>
              <div className="bg-[#F6F6F6] rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold mb-2">5% Deposit Scheme — price caps (capital cities):</p>
                <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc pl-4">
                  <li>NSW (Sydney): <strong>$1,500,000</strong></li>
                  <li>VIC (Melbourne): <strong>$950,000</strong></li>
                  <li>QLD (Brisbane): <strong>$1,000,000</strong></li>
                  <li>WA (Perth): <strong>$850,000</strong></li>
                  <li>SA (Adelaide): <strong>$900,000</strong></li>
                  <li>ACT (Canberra): <strong>$1,000,000</strong></li>
                </ul>
              </div>
              <div className="bg-[#F6F6F6] rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold mb-2">Help to Buy — how it works:</p>
                <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc pl-4">
                  <li>Government co-purchases up to <strong>40%</strong> of a new build, or <strong>30%</strong> of an existing home</li>
                  <li>You only need a <strong>2% deposit</strong> — no LMI required</li>
                  <li>Income caps: <strong>$100,000</strong> (singles) / <strong>$160,000</strong> (couples or single parents)</li>
                  <li>Applications open — apply through a participating lender (not directly to Housing Australia)</li>
                  <li>You can buy back the government&apos;s share over time</li>
                </ul>
              </div>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                <strong>What this means for you:</strong> A 2% deposit on an $800k property is just $16,000 — versus $160,000 to avoid LMI on your own. These are among the most powerful tools available to first-home buyers right now. Run the numbers before assuming you don&apos;t qualify.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">4. Housing supply — $2 billion infrastructure fund and 1.2 million homes target</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The budget announced a new <strong>$2 billion Local Infrastructure Fund</strong> to help councils and state utilities connect new housing developments to roads, water, power and sewerage — one of the biggest practical barriers to getting new homes built.
              </p>
              <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc pl-4 mt-4">
                <li>Up to <strong>65,000 homes</strong> unlocked over 10 years</li>
                <li><strong>$500 million</strong> reserved specifically for regional Australia</li>
                <li>Total housing-enabling infrastructure investment now <strong>$6.3 billion</strong></li>
                <li>A further <strong>$5.9 billion</strong> available to states for the 100,000 Homes for First Home Buyers program</li>
                <li>Aspiration: <strong>1.2 million new homes</strong> in five years (shared with all levels of government)</li>
              </ul>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                New housing supply takes 2–4 years to reach the market. Don&apos;t expect these measures to cool prices in established suburbs in the near term — but greenfield areas and regional growth corridors should benefit within 18–24 months.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">5. Interest rates — three cuts, then three hikes</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The rate story of the past 18 months is a rollercoaster that matters enormously for your borrowing power. After holding at 4.35% through late 2024, the RBA cut rates <strong>three times in 2025</strong> — bringing the cash rate down to a cycle low of <strong>3.60%</strong> by August 2025. Housing market activity picked up strongly.
              </p>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                Then the Middle East conflict hit global oil markets hard. Inflation reversed, and the RBA was forced to hike three times in a row — February, March, and May 2026 — returning to <strong>4.35%</strong>. All of the 2025 rate relief has been completely erased.
              </p>
              <div className="bg-[#F6F6F6] rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold mb-3">Cash rate timeline</p>
                <div className="space-y-1.5 text-sm text-[#6B6B6B]">
                  <div className="flex justify-between"><span>Feb 2025 — first cut</span><span className="text-green-700 font-medium">4.10% ↓</span></div>
                  <div className="flex justify-between"><span>May 2025 — second cut</span><span className="text-green-700 font-medium">3.85% ↓</span></div>
                  <div className="flex justify-between"><span>Aug 2025 — third cut (cycle low)</span><span className="text-green-700 font-medium">3.60% ↓</span></div>
                  <div className="flex justify-between"><span>Feb 2026 — first hike</span><span className="text-red-600 font-medium">3.85% ↑</span></div>
                  <div className="flex justify-between"><span>Mar 2026 — second hike</span><span className="text-red-600 font-medium">4.10% ↑</span></div>
                  <div className="flex justify-between"><span>May 2026 — third hike</span><span className="text-red-600 font-bold">4.35% ↑ (current)</span></div>
                </div>
              </div>
              <p className="leading-relaxed text-[#6B6B6B] mt-4">
                The Treasurer acknowledged the May hike would &quot;make it tougher&quot; for families. The government&apos;s fuel excise cut (halved to 20.6c/litre from 1 April 2026) and new income tax cuts are designed to offset some of that pressure. The budget baseline assumes oil prices fall from ~$100 to $80/barrel by mid-2027, but a prolonged conflict could push inflation toward 7%.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-5">
                <p className="text-sm font-bold text-amber-800 mb-2">⚠️ Rate outlook</p>
                <p className="text-sm text-amber-700">
                  The rate cycle has reversed. Don&apos;t build your borrowing plan around further cuts in the near term — the RBA&apos;s next move is genuinely uncertain. Model repayments at 4.35% plus a 1–2% buffer.
                </p>
              </div>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">6. Foreign investor ban extended to mid-2029</h2>
              <p className="leading-relaxed text-[#6B6B6B]">
                The ban on foreign investors purchasing <strong>established (existing) homes</strong> has been extended to <strong>mid-2029</strong>. Foreign buyers can still purchase new builds, which aligns with the government&apos;s broader strategy of directing all demand — domestic and foreign — toward new construction.
              </p>
            </section>

            <hr className="border-[#EEEEEE]" />

            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">Bottom line for first-home buyers</h2>
              <div className="space-y-4">
                {[
                  { emoji: '✅', text: 'The 5% deposit program and Help to Buy are live and widely used — more than half of first-home buyers are already accessing them. Check your eligibility now.' },
                  { emoji: '🏗️', text: 'New builds are now even more advantageous: exempt from the negative gearing and CGT changes, eligible for higher grant thresholds, and prioritised by the government\'s entire supply agenda.' },
                  { emoji: '📈', text: 'Rates just went up — not down. Factor the current cash rate into your borrowing capacity and add a buffer. Don\'t assume a cut is coming.' },
                  { emoji: '⏳', text: 'The negative gearing and CGT changes don\'t kick in until 2027. Competition on established homes from investors remains high through 2026.' },
                  { emoji: '🔍', text: 'The best opportunities for first-home buyers remain in areas with strong infrastructure investment and planned new supply — exactly what Brick AI is designed to help you find.' },
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
