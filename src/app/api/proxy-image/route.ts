import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_DOMAINS = [
  'images.domain.com.au',
  'bucket-api.domain.com.au',
  'bucket.realestate.com.au',
  'media.realestate.com.au',
  'photos.domain.com.au',
  'i2.au.reastatic.net',
  'bucket-api.domain.com.au',
  'images.unsplash.com',
  'streetviewpixels-pa.googleapis.com',
  'maps.googleapis.com',
]

const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#1a1a1a"/>
  <text x="200" y="155" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#666">No image available</text>
</svg>`

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return new NextResponse(PLACEHOLDER_SVG, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return new NextResponse(PLACEHOLDER_SVG, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  }

  if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
    return new NextResponse(PLACEHOLDER_SVG, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  }

  try {
    // Use the site's own origin as Referer to pass CDN hotlink checks
    const siteReferer = parsed.hostname.includes('domain.com.au')
      ? 'https://www.domain.com.au/'
      : parsed.hostname.includes('realestate.com.au')
      ? 'https://www.realestate.com.au/'
      : `https://${parsed.hostname}/`

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': siteReferer,
        'Accept': 'image/webp,image/avif,image/*,*/*',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) throw new Error(`upstream ${res.status}`)

    const contentType = res.headers.get('content-type') ?? 'image/jpeg'
    const buffer = await res.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return new NextResponse(PLACEHOLDER_SVG, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  }
}
