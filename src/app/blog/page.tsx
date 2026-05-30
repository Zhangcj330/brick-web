import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog — Brick AI',
  description: 'Insights, analysis, and guides for Australian first-home buyers.',
  openGraph: {
    title: 'Blog — Brick AI',
    description: 'Insights, analysis, and guides for Australian first-home buyers.',
    url: 'https://thebrickai.com/blog',
    type: 'website',
  },
  alternates: { canonical: 'https://thebrickai.com/blog' },
}

const POSTS = [
  {
    slug: 'australia-budget-2025-property',
    date: '24 May 2026',
    tag: 'Market Analysis',
    title: "Australia's 2026 Federal Budget: What It Means for First-Home Buyers",
    excerpt: "The 2026 Federal Budget delivered a mix of housing supply measures and demand-side support. We break down what actually matters if you're trying to buy your first home this year.",
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="pt-[66px]">
        <section className="border-b border-[#EEEEEE] py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-4">Brick AI Blog</p>
            <h1 className="text-5xl font-black tracking-tight mb-4">Insights for first-home buyers</h1>
            <p className="text-[#6B6B6B] text-lg max-w-xl">Market analysis, budget guides, and suburb deep-dives — in plain English.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {POSTS.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block border border-[#EEEEEE] rounded-2xl p-6 hover:border-black transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold bg-[#F6F6F6] px-2.5 py-1 rounded-full">{post.tag}</span>
                    <span className="text-xs text-[#AFAFAF]">{post.readTime}</span>
                  </div>
                  <h2 className="font-black text-lg leading-snug tracking-tight mb-3 group-hover:underline">{post.title}</h2>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#AFAFAF]">{post.date}</span>
                    <ArrowRight className="w-4 h-4 text-[#AFAFAF] group-hover:text-black transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
