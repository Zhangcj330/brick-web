import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Brick AI',
    short_name: 'Brick AI',
    description: 'The AI buyer's agent for first-home buyers in Australia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: '/logo-on-black.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
