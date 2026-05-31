'use client'

import { useState } from 'react'
import type React from 'react'
import { BedDouble, Bath, Car, SquareDashed, ChevronLeft, ChevronRight, ArrowRight, Navigation, Zap, TriangleAlert, Sun, MountainSnow, Volume2, History, ClipboardCheck, Bug } from 'lucide-react'

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
  // Risk assessment
  land_slope?: string
  land_slope_note?: string
  noise_level?: string
  noise_sources?: string[]
  noise_note?: string
  builder_name?: string
  builder_quality?: string
  builder_note?: string
  property_history_flags?: string[]
  property_history_note?: string
  needs_inspection?: boolean
  needs_pest_control?: boolean
  due_diligence_note?: string
}

function proxyUrl(url: string) {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

// Uber-style monochrome check row: icon + label · note
function CheckRow({ icon: Icon, ok, label, note }: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  ok: boolean
  label: string
  note?: string
}) {
  return (
    <div className="flex items-start gap-2.5 py-[5px]">
      <Icon size={13} strokeWidth={2} className="mt-[1px] shrink-0 text-[#8a8a8a]" />
      <span className="text-[12px] leading-[1.5] text-[#0d0d0d]">
        {label}
        {note && <span className="text-[#8a8a8a]"> · {note}</span>}
      </span>
      <span className={`ml-auto shrink-0 text-[11px] font-semibold tabular-nums ${ok ? 'text-[#0d0d0d]' : 'text-[#0d0d0d]'}`}>
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
  land_slope,
  land_slope_note,
  noise_level,
  noise_sources = [],
  noise_note,
  builder_name,
  builder_quality,
  builder_note,
  property_history_flags = [],
  property_history_note,
  needs_inspection,
  needs_pest_control,
  due_diligence_note,
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
              <CheckRow icon={Navigation} ok={!on_main_road}
                label="Main road"
                note={main_road_note} />
            )}
            {powerlines_nearby != null && (
              <CheckRow icon={Zap} ok={!powerlines_nearby}
                label="Powerlines"
                note={powerlines_note} />
            )}
            {t_junction != null && (
              <CheckRow icon={TriangleAlert} ok={!t_junction}
                label="T-junction"
                note={t_junction_note} />
            )}
            {orientation && (
              <div className="flex items-start gap-2.5 py-[5px]">
                <Sun size={13} strokeWidth={2} className="mt-[1px] shrink-0 text-[#8a8a8a]" />
                <span className="text-[12px] leading-[1.5] text-[#0d0d0d]">
                  Orientation
                  {sunlight_note && <span className="text-[#8a8a8a]"> · {sunlight_note}</span>}
                </span>
                <span className="ml-auto shrink-0 text-[11px] font-semibold text-[#0d0d0d]">{orientation.replace('-facing', '')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Condition */}
      {(kitchen_condition || bathroom_condition) && (
        <div className="mt-3 border-t border-[#f0f0f0] pt-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">Condition</span>
            {renovation_note && (
              <span className="text-[11px] text-[#8a8a8a]">{renovation_note}</span>
            )}
          </div>
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
        </div>
      )}

      {/* Risk */}
      {(land_slope || noise_level || property_history_flags.length > 0 || needs_inspection || needs_pest_control) && (
        <div className="mt-3 border-t border-[#f0f0f0] pt-3">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">Risk</div>
          <div className="divide-y divide-[#f0f0f0]">
            {land_slope && (
              <div className="flex items-start gap-2.5 py-[5px]">
                <MountainSnow size={13} strokeWidth={2} className="mt-[1px] shrink-0 text-[#8a8a8a]" />
                <span className="text-[12px] leading-[1.5] text-[#0d0d0d]">
                  Slope
                  {land_slope_note && <span className="text-[#8a8a8a]"> · {land_slope_note}</span>}
                </span>
                <span className="ml-auto shrink-0 text-[11px] font-semibold text-[#0d0d0d]">{land_slope}</span>
              </div>
            )}
            {noise_level && (
              <div className="flex items-start gap-2.5 py-[5px]">
                <Volume2 size={13} strokeWidth={2} className="mt-[1px] shrink-0 text-[#8a8a8a]" />
                <span className="text-[12px] leading-[1.5] text-[#0d0d0d]">
                  Noise
                  {noise_sources.length > 0 && <span className="text-[#8a8a8a]"> · {noise_sources.join(', ')}</span>}
                  {noise_note && !noise_sources.length && <span className="text-[#8a8a8a]"> · {noise_note}</span>}
                </span>
                <span className="ml-auto shrink-0 text-[11px] font-semibold text-[#0d0d0d]">{noise_level}</span>
              </div>
            )}
            {property_history_flags.length > 0 && (
              <div className="flex items-start gap-2.5 py-[5px]">
                <History size={13} strokeWidth={2} className="mt-[1px] shrink-0 text-[#8a8a8a]" />
                <span className="text-[12px] leading-[1.5] text-[#0d0d0d]">
                  History
                  <span className="text-[#8a8a8a]"> · {property_history_flags.join(' · ')}</span>
                </span>
              </div>
            )}
          </div>
          {(needs_inspection || needs_pest_control) && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {needs_inspection && (
                <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#0d0d0d] px-2 py-1 text-[11px] font-semibold text-[#0d0d0d]">
                  <ClipboardCheck size={10} strokeWidth={2.5} />
                  Building inspection
                </span>
              )}
              {needs_pest_control && (
                <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#0d0d0d] px-2 py-1 text-[11px] font-semibold text-[#0d0d0d]">
                  <Bug size={10} strokeWidth={2.5} />
                  Pest inspection
                </span>
              )}
              {due_diligence_note && (
                <p className="mt-1 w-full text-[11px] leading-[1.4] text-[#8a8a8a]">{due_diligence_note}</p>
              )}
            </div>
          )}
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
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] bg-[#f9f9f9]">
            <ArrowRight size={14} strokeWidth={2} />
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
