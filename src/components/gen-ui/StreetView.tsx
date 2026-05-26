'use client'

interface StreetViewProps {
  address?: string
  lat?: number
  lng?: number
  image_url?: string
}

export default function StreetView({ address = '', lat, lng, image_url }: StreetViewProps) {
  const apiKey = ''
  const location = lat != null && lng != null ? `${lat},${lng}` : encodeURIComponent(address)
  const embedSrc = image_url
    ? `/api/proxy-image?url=${encodeURIComponent(image_url)}`
    : `https://maps.googleapis.com/maps/api/streetview?size=640x320&location=${location}&key=${apiKey}`

  return (
    <div className="text-[#0d0d0d]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={embedSrc}
        alt={`Street view of ${address}`}
        className="block max-h-[200px] w-full rounded-[6px] object-cover bg-[#f0f0f0]"
        onError={e => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
      {address && <div className="mt-2 text-[12px] text-[#8a8a8a]">{address}</div>}
    </div>
  )
}
