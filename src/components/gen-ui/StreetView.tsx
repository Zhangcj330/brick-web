'use client'

import { useState } from 'react'

interface StreetViewProps {
  address?: string
  lat?: number
  lng?: number
  image_url?: string
}

export default function StreetView({ address = '', lat, lng, image_url }: StreetViewProps) {
  const [failed, setFailed] = useState(false)
  const params = new URLSearchParams()
  if (lat != null && lng != null) {
    params.set("lat", String(lat))
    params.set("lng", String(lng))
  } else if (address) {
    params.set("address", address)
  }

  const src = image_url
    ? `/api/proxy-image?url=${encodeURIComponent(image_url)}`
    : params.toString()
      ? `/api/street-view?${params}`
      : null

  return (
    <div className="text-[#0d0d0d]">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`Street view of ${address}`}
          className="block max-h-[200px] w-full rounded-[6px] object-cover bg-[#f0f0f0]"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-[160px] w-full items-center justify-center rounded-[6px] bg-[#f6f6f6] text-[12px] text-[#8a8a8a]">
          Street view unavailable
        </div>
      )}
      {address && <div className="mt-2 text-[12px] text-[#8a8a8a]">{address}</div>}
    </div>
  )
}
