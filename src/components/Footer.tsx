import Link from 'next/link'

const COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/#suggestions' },
      { label: 'How it works', href: '/#how' },
      { label: 'Reviews', href: '/#proof' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Join waitlist', href: '/waitlist' },
      { label: 'Play game', href: '/game' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#EEEEEE] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="font-black text-lg tracking-tight mb-3">Brick AI</div>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">The AI co-pilot for first-home buyers in Australia.</p>
        </div>
        {COLS.map(col => (
          <div key={col.heading}>
            <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#AFAFAF] mb-4">{col.heading}</div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[#3A3A3A] hover:text-black transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#EEEEEE] px-10 py-5 max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#AFAFAF]">© 2025 Brick AI. All rights reserved.</p>
        <p className="text-xs text-[#AFAFAF]">Built for Australian first-home buyers.</p>
      </div>
    </footer>
  )
}
