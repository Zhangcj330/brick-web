const TESTIMONIALS = [
  { initials: 'KX', name: 'Kelly X.', role: 'Beta tester · Melbourne', quote: 'I was completely lost before Brick. After one session I understood my borrowing power, what grants I qualified for, and exactly what to offer. We bought in 6 weeks.' },
  { initials: 'JL', name: 'Joseph L.', role: 'Beta tester · Sydney', quote: 'Brick found two clauses in our contract that our conveyancer missed. Saved us a potentially huge problem. Worth every cent.' },
  { initials: 'LL', name: 'Linfeng L.', role: 'Beta tester · Brisbane', quote: 'The negotiation coach is unreal. I went into auction knowing my absolute ceiling and the vendor\'s price history. Bought $22k under what I was prepared to pay.' },
]

export default function Testimonials() {
  return (
    <section id="proof" className="bg-[#F6F6F6] py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">What beta testers say</p>
        <h2 className="text-[40px] font-black tracking-[-0.02em] mb-2">Early feedback.<br />Real reactions.</h2>
        <p className="text-sm text-[#888] mb-10">From our closed beta trial — before we launch.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#E2E2E2] hover:shadow-lg transition-shadow flex flex-col">
              <div className="text-yellow-400 text-base mb-3">★★★★★</div>
              <p className="text-sm leading-relaxed text-[#1A1A1A] mb-5 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="h-px bg-[#EEEEEE] mb-4 mt-auto" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{t.initials}</div>
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-[#6B6B6B]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
