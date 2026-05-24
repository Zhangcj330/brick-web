'use client'
import { useEffect, useRef, useState } from 'react'
import { DEE_WHY_PROPERTIES, type Property } from '@/types/property'

export default function MapPanel() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)
  const markersRef = useRef<Record<number, unknown>>({})
  const [selected, setSelected] = useState<Property | null>(DEE_WHY_PROPERTIES[0])
  const [filter, setFilter] = useState<'all' | 'buy' | 'invest'>('all')
  const propertiesRef = useRef(DEE_WHY_PROPERTIES.map(p => ({ ...p })))

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      if (!mapRef.current) return
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (cancelled || !mapRef.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((mapRef.current as any)._leaflet_id) return

      const map = L.map(mapRef.current, {
        center: [-33.7495, 151.2885],
        zoom: 15,
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

      L.polygon(
        [[-33.744,151.282],[-33.744,151.296],[-33.756,151.296],[-33.756,151.282]] as [number,number][],
        { color: 'transparent', fillColor: '#D9E5D8', fillOpacity: 0.40, interactive: false }
      ).addTo(map)

      L.marker([-33.750, 151.289] as [number,number], {
        icon: L.divIcon({ className: 'suburb-label', html: 'DEE WHY', iconAnchor: [35, 8] }),
        interactive: false,
      }).addTo(map)

      function makePinIcon(p: Property) {
        return L.divIcon({
          className: '',
          html: `<div class="price-pin${p.active ? ' active' : ''}">${p.label}</div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        })
      }

      propertiesRef.current.forEach(prop => {
        const m = L.marker([prop.lat, prop.lng] as [number,number], {
          icon: makePinIcon(prop),
          zIndexOffset: prop.active ? 1000 : 0,
        }).addTo(map)

        m.on('click', () => {
          propertiesRef.current.forEach(p => {
            p.active = false
            ;(markersRef.current[p.id] as ReturnType<typeof L.marker>).setIcon(makePinIcon(p))
          })
          prop.active = true
          ;(markersRef.current[prop.id] as ReturnType<typeof L.marker>).setIcon(makePinIcon(prop))
          map.flyTo([prop.lat, prop.lng] as [number,number], 16, { duration: 0.9 })
          setSelected({ ...prop })
        })

        markersRef.current[prop.id] = m
      })

      setTimeout(() => {
        if (cancelled) return
        const first = propertiesRef.current[0]
        map.flyTo([first.lat, first.lng] as [number,number], 16, { duration: 0.9 })
        setSelected({ ...first })
      }, 900)
    })()

    return () => {
      cancelled = true
      if (mapInstance.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapInstance.current as any).remove()
        mapInstance.current = null
        markersRef.current = {}
      }
    }
  }, [])

  async function handleFilter(type: 'all' | 'buy' | 'invest') {
    setFilter(type)
    const L = (await import('leaflet')).default
    const map = mapInstance.current as ReturnType<typeof L.map>
    propertiesRef.current.forEach(prop => {
      const m = markersRef.current[prop.id] as ReturnType<typeof L.marker>
      if (!m) return
      if (type === 'all' || prop.type === type) m.addTo(map)
      else m.remove()
    })
    setSelected(null)
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ height: 560 }}>
      {/* Map container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Filter toolbar — overlaid top-left on the map */}
      <div className="absolute top-3 left-3 z-[1000] flex gap-2">
        {(['all', 'buy', 'invest'] as const).map(t => (
          <button key={t} onClick={() => handleFilter(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors shadow-sm backdrop-blur-sm ${
              filter === t ? 'bg-black text-white border-black' : 'bg-white/90 border-[#E2E2E2] text-black hover:bg-white'
            }`}>
            {t === 'all' ? 'All' : t === 'buy' ? 'Owner-occupier' : 'Investment'}
          </button>
        ))}
      </div>

      {/* Property card */}
      {selected && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl z-[1000] transition-all">
            {/* Header row: price + close button */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {selected.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selected.image} alt={selected.address} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-[#F6F6F6] flex items-center justify-center flex-shrink-0 text-[#AFAFAF] text-2xl">🏠</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{selected.address}</div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">{selected.meta}</div>
                  <span className="inline-block mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: selected.verdictColor, color: selected.verdictText }}>
                    {selected.verdict}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 flex-shrink-0 ml-2">
                <div className="text-right">
                  <div className="font-bold text-base tracking-tight">{selected.price}</div>
                  <div className="text-[11px] text-[#6B6B6B] mt-0.5">{selected.growth}</div>
                </div>
                <button onClick={() => setSelected(null)} className="w-6 h-6 rounded-full bg-[#F6F6F6] flex items-center justify-center text-xs text-[#6B6B6B] hover:bg-[#E2E2E2] flex-shrink-0">✕</button>
              </div>
            </div>
            <div className="h-px bg-[#EEEEEE] my-3" />
            <div className="grid grid-cols-3 text-center gap-2">
              {[
                { label: 'Median suburb', val: selected.median },
                { label: 'Clearance rate', val: selected.clearance },
                { label: 'Days on market', val: selected.dom },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-[10px] text-[#6B6B6B] uppercase tracking-wide">{s.label}</div>
                  <div className="font-bold text-sm mt-0.5">{s.val}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <a href="/waitlist" className="flex-1 text-center bg-black text-white text-xs font-bold py-2.5 rounded-full hover:bg-[#333] transition-colors">Join waitlist</a>
              <button className="flex-1 bg-[#F6F6F6] text-black text-xs font-semibold py-2.5 rounded-full hover:bg-[#EEEEEE] transition-colors">Save</button>
            </div>
          </div>
        )}
      </div>
  )
}
