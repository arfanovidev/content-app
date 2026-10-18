import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Content App — Bilingual Reading & Research',
    short_name: 'Content',
    description: 'A calm, ad-free bilingual reading and research platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    orientation: 'portrait-primary',
    icons: [
      { src: '/logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    categories: ['education', 'books', 'news'],
    lang: 'en',
    dir: 'ltr',
  };
}