import { Search, Calculator, Handshake, Gift, FileText, CalendarCheck } from 'lucide-react'

const FEATURES = [
  { icon: Search, title: 'AI property analysis', desc: 'Instant deep-dive into any listing — comparable sales, flood zones, school ratings, and suburb growth trends in one view.' },
  { icon: Calculator, title: 'Budget intelligence', desc: 'Know exactly what you can afford. Brick models stamp duty, LMI, council rates, and hidden costs so there are no surprises.' },
  { icon: Handshake, title: 'Negotiation coach', desc: 'Get data-backed offers. Our AI tells you the realistic price range and the right tactics before you make an offer.' },
  { icon: Gift, title: 'Grant finder', desc: 'Automatically surfaces every first-home buyer grant, scheme, and concession you\'re eligible for across federal and state programs.' },
  { icon: FileText, title: 'Contract review', desc: 'Upload your contract of sale. Brick flags risky clauses, special conditions, and anything your conveyancer should look at.' },
  { icon: CalendarCheck, title: 'Settlement timeline', desc: 'A personalised step-by-step roadmap from deposit to keys — with deadlines, checklists, and reminders you can actually follow.' },
]

export default function Features() {
  return (
    <section id="suggestions" className="bg-[#F6F6F6] py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">What Brick AI does</p>
        <h2 className="text-[40px] font-black tracking-[-0.02em] mb-12">Everything you need.<br />Nothing you don&apos;t.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#EEEEEE] hover:shadow-lg transition-shadow flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F6F6F6] flex items-center justify-center">
                <f.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-base mb-1">{f.title}</div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
