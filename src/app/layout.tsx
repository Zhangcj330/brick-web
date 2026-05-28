import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-hanken',
  display: 'swap',
})

const siteUrl = 'https://thbrickai.com'
const defaultTitle = 'Brick AI — The AI co-pilot for first-home buyers'
const defaultDescription =
  'Brick AI gives first-home buyers the clarity, data, and negotiation edge to buy right — without the guesswork.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s — Brick AI',
  },
  description: defaultDescription,
  icons: {
    icon: '/logo-on-black.svg',
    shortcut: '/logo-on-black.svg',
    apple: '/logo-on-black.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'Brick AI',
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brick AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brick AI',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: defaultDescription,
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hanken.variable}>
      <body className={hanken.className}>
        {children}
        <Analytics />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
