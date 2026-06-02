'use client'

import { useEffect, useRef, useState } from 'react'

type PropertyType = 'buy' | 'invest'
type Sentiment = 'positive' | 'neutral' | 'caution'

interface PropertyPin {
  address: string
  lat: number
  lng: number
  label: string
  price?: number
  meta?: string
  type?: PropertyType
  verdict?: string
  verdict_sentiment?: Sentiment
  growth?: string
  median_suburb?: string
  clearance_rate?: string
  days_on_market?: string
}

interface MapViewProps {
  suburb?: string
  state?: string
  lat?: number
  lng?: number
  zoom?: number
  properties?: PropertyPin[]
  listings?: PropertyPin[]   // alias accepted from agent
  // legacy fallback fields
  center_lat?: number
  center_lng?: number
  pins?: Array<{ lat: number; lng: number; label?: string; address?: string; price?: string }>
}

const SENTIMENT_BADGE: Record<Sentiment, { bg: string; text: string }> = {
  positive: { bg: '#E8F5E9', text: '#1B5E20' },
  neutral:  { bg: '#FFF8E1', text: '#E65100' },
  caution:  { bg: '#FDE8E8', text: '#B71C1C' },
}

export default function MapView({
  suburb,
  lat,
  lng,
  zoom = 15,
  properties = [],
  listings = [],
  center_lat,
  center_lng,
  pins = [],
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)
  const markersRef = useRef<Record<number, unknown>>({})
  const propsRef = useRef<(PropertyPin & { active: boolean; id: number })[]>([])

  const centerLat = lat ?? center_lat ?? -33.8688
  const centerLng = lng ?? center_lng ?? 151.2093

  const allProps: PropertyPin[] = properties.length > 0
    ? properties
    : listings.length > 0
      ? listings
      : pins.map(p => ({ address: p.address ?? '', lat: p.lat, lng: p.lng, label: p.price ?? p.label ?? '●' }))

  const [selected, setSelected] = useState<(PropertyPin & { active: boolean; id: number }) | null>(null)
  const [filter, setFilter] = useState<'all' | 'buy' | 'invest'>('all')

  useEffect(() => {
    let cancelled = false
    propsRef.current = allProps.map((p, i) => ({ ...p, active: i === 0, id: i }))

    ;(async () => {
      if (!mapRef.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((mapRef.current as any)._leaflet_id) return

      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      if (cancelled || !mapRef.current) return

      const map = L.map(mapRef.current, {
        center: [centerLat, centerLng],
        zoom,
        zoomControl: false,
        scrollWheelZoom: false,
      })
      if (cancelled) { map.remove(); return }
      mapInstance.current = map

      L.control.zoom({ position: 'topright' }).addTo(map)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      function pinHtml(p: PropertyPin & { active: boolean }) {
        const bg = p.active ? '#000' : '#fff'
        const color = p.active ? '#fff' : '#000'
        const border = p.active ? '' : 'border:1.5px solid #E2E2E2;'
        return `<div style="background:${bg};color:${color};padding:5px 12px;border-radius:999px;font-size:12px;font-weight:700;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.18);${border}display:inline-block;">${p.label}</div>`
      }

      propsRef.current.forEach(prop => {
        const icon = L.divIcon({ className: '', html: pinHtml(prop), iconSize: [0, 0], iconAnchor: [0, 0] })
        const m = L.marker([prop.lat, prop.lng], { icon, zIndexOffset: prop.active ? 1000 : 0 }).addTo(map)
        m.on('click', () => {
          propsRef.current.forEach(p => {
            p.active = false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(markersRef.current[p.id] as any)?.setIcon(L.divIcon({ className: '', html: pinHtml(p), iconSize: [0, 0], iconAnchor: [0, 0] }))
          })
          prop.active = true
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(markersRef.current[prop.id] as any)?.setIcon(L.divIcon({ className: '', html: pinHtml(prop), iconSize: [0, 0], iconAnchor: [0, 0] }))
          map.flyTo([prop.lat, prop.lng], 16, { duration: 0.8 })
          setSelected({ ...prop })
        })
        markersRef.current[prop.id] = m
      })

      if (propsRef.current[0]) {
        setTimeout(() => { if (!cancelled) setSelected({ ...propsRef.current[0] }) }, 400)
      }
    })()

    return () => {
      cancelled = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (mapInstance.current) { (mapInstance.current as any).remove(); mapInstance.current = null; markersRef.current = {} }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleFilter(type: 'all' | 'buy' | 'invest') {
    setFilter(type)
    const L = (await import('leaflet')).default
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapInstance.current as ReturnType<typeof L.map>
    propsRef.current.forEach(p => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const m = markersRef.current[p.id] as any
      if (!m) return
      if (type === 'all' || p.type === type) m.addTo(map)
      else m.remove()
    })
    setSelected(null)
  }

  const sentiment = selected?.verdict_sentiment ?? 'positive'
  const badge = SENTIMENT_BADGE[sentiment]

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md" style={{ height: 520 }}>
      <div ref={mapRef} className="h-full w-full" />

      {/* Filter toolbar */}
      <div className="absolute left-3 top-3 z-[1000] flex gap-2">
        {(['all', 'buy', 'invest'] as const).map(t => (
          <button
            key={t}
            onClick={() => handleFilter(t)}
            className="rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-colors"
            style={filter === t
              ? { background: '#000', borderColor: '#000', color: '#fff' }
              : { background: 'rgba(255,255,255,0.9)', borderColor: '#E2E2E2', color: '#000' }
            }
          >
            {t === 'all' ? 'All' : t === 'buy' ? 'Owner-occupier' : 'Investment'}
          </button>
        ))}
      </div>


      {/* Property card overlay */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] rounded-2xl bg-white p-4 shadow-xl transition-all">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#F6F6F6] text-2xl">🏠</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold">{selected.address}</div>
                <div className="mt-0.5 text-xs text-[#6B6B6B]">{selected.meta ?? ''}</div>
                {selected.verdict && (
                  <span
                    className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: badge.bg, color: badge.text }}
                  >
                    {selected.verdict}
                  </span>
                )}
              </div>
            </div>
            <div className="ml-2 flex flex-shrink-0 items-start gap-2">
              <div className="text-right">
                <div className="text-base font-bold tracking-tight">{selected.label}</div>
                {selected.growth && <div className="mt-0.5 text-[11px] text-[#6B6B6B]">{selected.growth}</div>}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#F6F6F6] text-xs text-[#6B6B6B] hover:bg-[#E2E2E2]"
              >
                ✕
              </button>
            </div>
          </div>

          {(selected.median_suburb || selected.clearance_rate || selected.days_on_market) && (
            <>
              <div className="my-3 h-px bg-[#EEEEEE]" />
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Suburb median', val: selected.median_suburb },
                  { label: 'Clearance rate', val: selected.clearance_rate },
                  { label: 'Days on market', val: selected.days_on_market },
                ].map(s => s.val ? (
                  <div key={s.label}>
                    <div className="text-[10px] uppercase tracking-wide text-[#6B6B6B]">{s.label}</div>
                    <div className="mt-0.5 text-sm font-bold">{s.val}</div>
                  </div>
                ) : null)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
