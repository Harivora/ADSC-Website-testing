import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Atmiya Developer Student Club',
    short_name: 'ADSC',
    description: 'Welcome to ADSC! We are a community of passionate student developers at Atmiya University, dedicated to fostering innovation, collaboration, and growth. Through events, workshops, and guidance, we aim to empower students with technical skills and real-world knowledge.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    id: '/',
    scope: '/',
    lang: 'en',
    dir: 'ltr',
    categories: ['education', 'technology', 'development', 'community'],
    shortcuts: [
      {
        name: 'Events',
        url: '/events',
        description: 'View upcoming events by ADSC'
      },
      {
        name: 'Hackathons',
        url: '/hackathons',
        description: 'Explore hackathons organized by ADSC'
      }
    ],
    icons: [
      {
        src: '/ADSC-Icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/ADSC-Icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/ADSC-Icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/ADSC-Icons/launcher-icon-1x.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/ADSC-Icons/launcher-icon-2x.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/ADSC-Icons/launcher-icon-4x.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    related_applications: [
      {
        platform: 'web',
        url: 'https://adsc-atmiya.in'
      }
    ],
    prefer_related_applications: false
  }
}
