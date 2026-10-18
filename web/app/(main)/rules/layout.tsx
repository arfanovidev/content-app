import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Community Rules — What We Expect from Readers and Writers',
  description:
    'Five principles that keep Content App useful, honest, and calm: be kind, add value, be honest, respect the reader, and protect privacy.',
  keywords: [
    'Content App rules', 'community guidelines', 'acceptable behaviour',
    'bilingual community rules', 'reader respect', 'content ethics',
  ],
  alternates: {
    canonical: '/rules',
    languages: { 'en-US': '/rules', 'bn-BD': '/rules', 'x-default': '/rules' },
  },
  openGraph: {
    type: 'website',
    title: 'Community Rules — Content App',
    description: 'Five principles that keep this platform useful, honest, and calm.',
    url: `${SITE_URL}/rules`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Community Rules' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Rules — Content App',
    description: 'Five principles that keep this platform useful, honest, and calm.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RulesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Community Rules — Content App',
    url: `${SITE_URL}/rules`,
    description: 'Five principles that keep Content App useful, honest, and calm.',
    inLanguage: ['en', 'bn'],
    isPartOf: { '@type': 'WebSite', name: 'Content App', url: SITE_URL },
    dateModified: '2026-10-01',
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}