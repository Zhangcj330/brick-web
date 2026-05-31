import Link from 'next/link'

const PRODUCT_LINKS = [
  { label: 'Features', href: '/#suggestions' },
  { label: 'How it works', href: '/#how' },
  { label: 'Reviews', href: '/#proof' },
]

const COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Sign in', href: '/sign-in' },
      { label: 'Create account', href: '/sign-up' },
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
          <p className="text-sm text-[#6B6B6B] leading-relaxed">The AI buyer's agent for first-home buyers in Australia.</p>
        </div>
        {/* Product links — use <a> for hash scroll to work on home page */}
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#AFAFAF] mb-4">Product</div>
          <ul className="flex flex-col gap-2.5">
            {PRODUCT_LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-[#3A3A3A] hover:text-black transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
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
        <p className="text-xs text-[#AFAFAF]">© 2026 Brick AI. All rights reserved.</p>
        <p className="text-xs text-[#AFAFAF]">Built for Australian first-home buyers.</p>
      </div>
    </footer>
  )
}
