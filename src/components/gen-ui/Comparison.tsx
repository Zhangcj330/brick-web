'use client'

import { useEffect, useState } from 'react'

interface ComparisonProperty {
  address: string
  price?: number
  bedrooms?: number
  bathrooms?: number
  land_size?: string
  score?: number
  pros?: string[]
  cons?: string[]
}

interface ComparisonProps {
  properties?: ComparisonProperty[]
  recommended_index?: number
}

function formatPrice(value?: number) {
  if (value == null) return '—'
  return `$${(value / 1_000_000).toFixed(2)}M`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function Comparison({ properties = [], recommended_index }: ComparisonProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [properties])

  if (properties.length === 0) return null

  return (
    <div className="overflow-x-auto text-[#0d0d0d]">
      <div className="flex gap-0">
        {properties.map((property, index) => {
          const isRecommended = index === recommended_index
          const scoreWidth = property.score == null ? 0 : clamp(property.score, 0, 100)
          const specs = [
            property.bedrooms != null ? `${property.bedrooms} bed` : null,
            property.bathrooms != null ? `${property.bathrooms} bath` : null,
            property.land_size ?? null,
          ].filter(Boolean)

          return (
            <div
              key={`${property.address}-${index}`}
              className="min-w-[220px] flex-1 border-r border-[#f0f0f0] p-3 last:border-r-0"
            >
              {isRecommended && (
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#19c37d]">
                  Recommended
                </div>
              )}
              <div className="mb-1 text-[13px] font-semibold leading-snug text-[#0d0d0d]">{property.address}</div>
              <div className="text-[20px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatPrice(property.price)}</div>

              {specs.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-[#8a8a8a]">
                  {specs.map(spec => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>
              )}

              {property.score != null && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[12px] text-[#0d0d0d]">
                    <span>Score</span>
                    <span>{property.score}/100</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#f0f0f0]">
                    <div
                      className="h-full rounded-full bg-[#0d0d0d] transition-[width] duration-700 ease-out"
                      style={{ width: `${isReady ? scoreWidth : 0}%` }}
                    />
                  </div>
                </div>
              )}

              {property.pros && property.pros.length > 0 && (
                <ul className="mt-2 space-y-0.5">
                  {property.pros.map((pro, itemIndex) => (
                    <li key={`${pro}-${itemIndex}`} className="text-[12px] text-[#19c37d]">
                      ✓ {pro}
                    </li>
                  ))}
                </ul>
              )}

              {property.cons && property.cons.length > 0 && (
                <ul className="mt-2 space-y-0.5">
                  {property.cons.map((con, itemIndex) => (
                    <li key={`${con}-${itemIndex}`} className="text-[12px] text-[#b42318]">
                      ✗ {con}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
