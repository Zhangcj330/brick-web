'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PropertyCardProps {
  address?: string
  price?: string
  bedrooms?: number
  bathrooms?: number
  carspaces?: number
  land_size?: string
  property_type?: string
  images?: string[]
  description?: string
  listing_url?: string
  warnings?: string[]
}

function proxyUrl(url: string) {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

export default function PropertyCard({
  address,
  price,
  bedrooms,
  bathrooms,
  carspaces,
  land_size,
  property_type,
  images = [],
  description,
  listing_url,
  warnings = [],
}: PropertyCardProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  const detailRows = [
    bedrooms != null ? { label: 'Bedrooms', value: `${bedrooms}` } : null,
    bathrooms != null ? { label: 'Bathrooms', value: `${bathrooms}` } : null,
    carspaces != null ? { label: 'Car spaces', value: `${carspaces}` } : null,
    land_size ? { label: 'Land size', value: land_size } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  const addressSub = [property_type, land_size].filter(Boolean).join(' · ')

  return (
    <div className="text-[#0d0d0d]">
      {images.length > 0 && (
        <div className="relative overflow-hidden bg-[#f0f0f0]">
          {/* Sliding strip */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={proxyUrl(img)}
                alt={i === 0 ? (address ?? 'Property image') : ''}
                className="w-full flex-shrink-0 object-cover"
                style={{ aspectRatio: '4/3' }}
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ))}
          </div>

          {/* Prev / Next arrows — only show if multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Price / type badges */}
          {(price || property_type) && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
              {price && (
                <span className="inline-flex items-center rounded-[4px] bg-black/65 px-2 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-[4px]">
                  {price}
                </span>
              )}
              {property_type && (
                <span className="inline-flex items-center rounded-[4px] bg-black/65 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.04em] text-white backdrop-blur-[4px]">
                  {property_type}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {(address || addressSub) && (
        <div className={images.length > 0 ? 'mt-[14px]' : ''}>
          {address && (
            <div className="text-[16px] font-bold tracking-[-0.01em] text-[#0d0d0d]">
              {address}
            </div>
          )}
          {addressSub && (
            <div className="mt-[3px] text-[13px] text-[#8a8a8a]">
              {addressSub}
            </div>
          )}
        </div>
      )}

      {detailRows.length > 0 && (
        <div className={address || addressSub ? 'mt-[14px]' : ''}>
          {detailRows.map((row, index) => (
            <div
              key={`${row.label}-${index}`}
              className="flex items-center justify-between gap-3 border-b border-[#f9f9f9] py-2 last:border-b-0"
            >
              <span className="text-[13px] text-[#8a8a8a]">{row.label}</span>
              <span className="text-right text-[14px] font-semibold text-[#0d0d0d]">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {description && (
        <p className="mt-[14px] text-[12px] leading-5 text-[#8a8a8a]">{description}</p>
      )}

      {warnings.length > 0 && (
        <div className="mt-[14px] space-y-1">
          {warnings.map((warning, index) => (
            <p key={`${warning}-${index}`} className="text-[12px] leading-5 text-[#8a8a8a]">
              {warning}
            </p>
          ))}
        </div>
      )}

      {listing_url && (
        <div className="mt-[14px] flex items-center gap-[10px] border-t border-[#f0f0f0] pt-[14px]">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] bg-[#f9f9f9] text-[13px] font-bold text-[#0d0d0d]">
            →
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-[#0d0d0d]">Listing available</div>
            <div className="mt-px text-[12px] text-[#8a8a8a]">Open the source listing in a new tab</div>
          </div>
          <a
            href={listing_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[13px] font-semibold text-[#0d0d0d] no-underline hover:underline"
          >
            View listing
          </a>
        </div>
      )}
    </div>
  )
}

