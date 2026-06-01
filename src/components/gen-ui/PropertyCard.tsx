'use client'

import { useState } from 'react'
import type React from 'react'
import { BedDouble, Bath, Car, SquareDashed, ChevronLeft, ChevronRight, ArrowRight, Navigation, Zap, TriangleAlert, Sun } from 'lucide-react'

interface PropertyCardProps {
  address?: string
  price?: string | number
  bedrooms?: number
  bathrooms?: number
  carspaces?: number
  parking?: number        // alias from Gemini tool call
  land_size?: string
  land_sqm?: number       // alias from Gemini tool call
  property_type?: string
  images?: string[]
  description?: string
  listing_url?: string
  domain_url?: string
  warnings?: string[]
  on_main_road?: boolean
  main_road_note?: string
  powerlines_nearby?: boolean
  powerlines_note?: string
  t_junction?: boolean
  t_junction_note?: string
  orientation?: string
  sunlight_note?: string
  kitchen_condition?: string
  bathroom_condition?: string
  renovation_needed?: boolean
  renovation_note?: string
}

function proxyUrl(url: string) {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

// Uber-style monochrome check row: icon + label + Yes/No
function CheckRow({ icon: Icon, ok, label }: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  ok: boolean
  label: string
}) {
  return (
    <div className="flex items-center gap-2.5 py-[5px]">
      <Icon size={13} strokeWidth={2} className="shrink-0 text-[#8a8a8a]" />
      <span className="text-[12px] text-[#0d0d0d]">{label}</span>
      <span className="ml-auto shrink-0 text-[11px] font-semibold text-[#0d0d0d]">
        {ok ? 'No' : 'Yes'}
      </span>
    </div>
  )
}

function ConditionBox({ label, condition, renovationNeeded }: {
  label: string
  condition: string
  renovationNeeded?: boolean
}) {
  const poor = condition === 'Poor'
  return (
    <div className="flex-1 rounded-[6px] border border-[#e5e7eb] px-3 py-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">{label}</div>
      <div className={`mt-0.5 text-[13px] font-semibold ${poor ? 'text-[#0d0d0d]' : 'text-[#0d0d0d]'}`}>{condition}</div>
      {renovationNeeded && (
        <div className="mt-1 text-[11px] text-[#8a8a8a]">Renovation needed</div>
      )}
    </div>
  )
}

export default function PropertyCard({
  address,
  price,
  bedrooms,
  bathrooms,
  carspaces,
  parking,
  land_size,
  land_sqm,
  property_type,
  images = [],
  description,
  listing_url,
  domain_url,
  warnings = [],
  on_main_road,
  main_road_note,
  powerlines_nearby,
  powerlines_note,
  t_junction,
  t_junction_note,
  orientation,
  sunlight_note,
  kitchen_condition,
  bathroom_condition,
  renovation_needed,
  renovation_note,
}: PropertyCardProps) {
  const [current, setCurrent] = useState(0)

  const cars = carspaces ?? parking
  const land = land_size ?? (land_sqm != null ? `${land_sqm}` : undefined)

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  const stats = [
    bedrooms != null ? { icon: BedDouble,   value: `${bedrooms}`,  label: 'bed' }  : null,
    bathrooms != null ? { icon: Bath,        value: `${bathrooms}`, label: 'bath' } : null,
    cars != null      ? { icon: Car,         value: `${cars}`,      label: 'car' }  : null,
    land              ? { icon: SquareDashed, value: land,          label: 'm²' }   : null,
  ].filter(Boolean) as Array<{ icon: React.ComponentType<{ size?: number; strokeWidth?: number }>, value: string, label: string }>

  const addressSub = [property_type].filter(Boolean).join(' · ')

  return (
    <div className="text-[#0d0d0d]">
      {images.length > 0 && (
        <div data-carousel className="relative overflow-hidden bg-[#f0f0f0]">
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

      {/* Stats row — icon chips */}
      {stats.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${address || addressSub ? 'mt-3' : images.length > 0 ? 'mt-[14px]' : ''}`}>
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-[6px] border border-[#f0f0f0] bg-[#f9f9f9] px-2.5 py-1.5"
            >
              <Icon size={14} strokeWidth={2} />
              <span className="text-[13px] font-semibold text-[#0d0d0d]">{value}</span>
              <span className="text-[11px] text-[#8a8a8a]">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Street check */}
      {(on_main_road != null || powerlines_nearby != null || t_junction != null || orientation) && (
        <div className="mt-3 border-t border-[#f0f0f0] pt-3">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">Street</div>
          <div className="divide-y divide-[#f0f0f0]">
            {on_main_road != null && (
              <CheckRow icon={Navigation} ok={!on_main_road} label="Main road" />
            )}
            {powerlines_nearby != null && (
              <CheckRow icon={Zap} ok={!powerlines_nearby} label="Powerlines" />
            )}
            {t_junction != null && (
              <CheckRow icon={TriangleAlert} ok={!t_junction} label="T-junction" />
            )}
            {orientation && (
              <div className="flex items-center gap-2.5 py-[5px]">
                <Sun size={13} strokeWidth={2} className="shrink-0 text-[#8a8a8a]" />
                <span className="text-[12px] text-[#0d0d0d]">Orientation</span>
                <span className="ml-auto shrink-0 text-[11px] font-semibold text-[#0d0d0d]">{orientation.replace('-facing', '')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Condition */}
      {(kitchen_condition || bathroom_condition) && (
        <div className="mt-3 border-t border-[#f0f0f0] pt-3">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">Condition</div>
          <div className="flex gap-2">
            {kitchen_condition && (
              <ConditionBox label="Kitchen" condition={kitchen_condition}
                renovationNeeded={renovation_needed && kitchen_condition !== 'Excellent' && kitchen_condition !== 'Good'} />
            )}
            {bathroom_condition && (
              <ConditionBox label="Bathroom" condition={bathroom_condition}
                renovationNeeded={renovation_needed && bathroom_condition !== 'Excellent' && bathroom_condition !== 'Good'} />
            )}
          </div>
          {renovation_note && (
            <p className="mt-2 text-[11px] leading-[1.4] text-[#8a8a8a]">{renovation_note}</p>
          )}
        </div>
      )}

      {description && (
        <p className="mt-[14px] text-[12px] leading-5 text-[#8a8a8a]">{description}</p>
      )}

      {(listing_url || domain_url) && (() => {
        const url = listing_url ?? domain_url!
        const source = listing_url ? 'realestate.com.au' : 'domain.com.au'
        return (
        <div className="mt-[14px] flex items-center gap-[10px] border-t border-[#f0f0f0] pt-[14px]">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] bg-[#f9f9f9]">
            <ArrowRight size={14} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-[#0d0d0d]">Listing available</div>
            <div className="mt-px text-[12px] text-[#8a8a8a]">{source}</div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[13px] font-semibold text-[#0d0d0d] no-underline hover:underline"
          >
            View listing
          </a>
        </div>
        )
      })()}
    </div>
  )
}
