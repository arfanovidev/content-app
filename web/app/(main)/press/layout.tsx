import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Press — Media Kit, Brand Assets, and Story of Content App',
  description:
    'Press resources for Content App — a bilingual reading and research platform. Brand assets, logo, boilerplate, and contact for journalists and researchers.',
  keywords: [
    'Content App press', 'media kit', 'press contact', 'brand assets',
    'bilingual reading platform press', 'startup press kit',
  ],
  alternates: {
    canonical: '/press',
    languages: { 'en-US': '/press', 'bn-BD': '/press', 'x-default': '/press' },
  },
  openGraph: {
    type: 'website',
    title: 'Press — Content App',
    description: 'Media kit, brand assets, and story of Content App.',
    url: `${SITE_URL}/press`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Press Kit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press — Content App',
    description: 'Media kit and brand assets for journalists.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Press — Content App',
    url: `${SITE_URL}/press`,
    description: 'Press kit and media resources for Content App.',
    inLanguage: ['en', 'bn'],
    isPartOf: { '@type': 'WebSite', name: 'Content App', url: SITE_URL },
    about: {
      '@type': 'Organization',
      name: 'Content App',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: 'An independent, ad-free bilingual reading platform for English and Bengali readers.',
      foundingDate: '2026',
      sameAs: [
        'https://twitter.com/contentapp',
        'https://github.com/arfanovidev',
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