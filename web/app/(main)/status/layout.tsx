import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'System Status — Uptime & Service Health',
  description:
    'Current and historical status of Content App services: web app, API, storage, and text-to-speech. Monitoring every 5 minutes, 90-day uptime history.',
  keywords: [
    'Content App status', 'system status', 'service uptime',
    'API health', 'TTS status', 'service monitoring',
  ],
  alternates: {
    canonical: '/status',
    languages: { 'en-US': '/status', 'bn-BD': '/status', 'x-default': '/status' },
  },
  openGraph: {
    type: 'website',
    title: 'System Status — Content App',
    description: 'Real-time and historical status of Content App services.',
    url: `${SITE_URL}/status`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'System Status' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Status — Content App',
    description: 'Real-time and historical status of Content App services.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'System Status — Content App',
    url: `${SITE_URL}/status`,
    description: 'Current status and 90-day uptime for web app, API, storage, and TTS.',
    inLanguage: ['en', 'bn'],
    isPartOf: { '@type': 'WebSite', name: 'Content App', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Content App Services',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Web App' },
        { '@type': 'ListItem', position: 2, name: 'API Server' },
        { '@type': 'ListItem', position: 3, name: 'Storage' },
        { '@type': 'ListItem', position: 4, name: 'Text-to-speech' },
      ],
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}