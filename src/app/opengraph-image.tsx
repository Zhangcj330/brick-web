import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "Brick AI — The AI buyer's agent for first-home buyers"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: brand name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Brick AI logo mark (SVG inline) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            width="48"
            height="48"
          >
            <path
              fill="#FFFFFF"
              fillRule="evenodd"
              d="M192 288 H352 L512 128 C548 106 576 96 610 96 H836 C854 96 864 106 864 124 V256 C864 318 824 352 748 352 H636 V480 H838 C856 480 864 490 864 508 V624 C864 692 820 736 744 736 H704 L578 898 C556 924 526 936 488 936 H192 C174 936 160 922 160 904 V320 C160 302 174 288 192 288 Z M414 288 H736 C778 288 800 270 800 236 V160 H542 L414 288 Z M224 352 V480 H568 V352 H224 Z M224 544 V672 H424 V544 H224 Z M488 544 V672 H736 C778 672 800 654 800 620 V544 H488 Z M224 736 V864 H478 C512 864 532 856 552 832 L626 736 H224 Z"
            />
          </svg>
          <span style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Brick AI
          </span>
        </div>

        {/* Middle: headline + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: '72px',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              maxWidth: '780px',
            }}
          >
            The AI buyer's agent for first-home buyers.
          </div>
          <div
            style={{
              color: '#AFAFAF',
              fontSize: '28px',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            Clarity, data, and negotiation edge — without the guesswork.
          </div>
        </div>

        {/* Bottom: domain */}
        <div style={{ color: '#6B6B6B', fontSize: '22px', letterSpacing: '0.01em' }}>
          thebrickai.com
        </div>
      </div>
    ),
    { ...size }
  )
}
