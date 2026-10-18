import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'About — A Calm, Bilingual Reading Platform',
  description:
    'Learn why Content App exists: a small, independent team building a bilingual (English + Bengali) reading and research platform with no ads, no tracking, and native text-to-speech.',
  keywords: [
    'about Content App', 'bilingual reading platform', 'ad-free reading',
    'English Bengali reading app', 'text-to-speech reading',
    'independent reading platform', 'Content App story',
  ],
  alternates: {
    canonical: '/about',
    languages: { 'en-US': '/about', 'bn-BD': '/about', 'x-default': '/about' },
  },
  openGraph: {
    type: 'website',
    title: 'About — Content App',
    description:
      'A small, independent team building a bilingual reading platform. No ads, no tracking, native TTS.',
    url: `${SITE_URL}/about`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Content App' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Content App',
    description: 'A small, independent team building a bilingual reading platform.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Content App',
    description:
      'A bilingual reading and research platform with English and Bengali support, native text-to-speech, and no ads.',
    url: `${SITE_URL}/about`,
    inLanguage: ['en', 'bn'],
    isPartOf: {
      '@type': 'WebSite',
      name: 'Content App',
      url: SITE_URL,
    },
    about: {
      '@type': 'Organization',
      name: 'Content App',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        'An independent, ad-free bilingual reading platform for English and Bengali readers.',
      foundingDate: '2026',
      sameAs: [
        'https://twitter.com/contentapp',
        'https://github.com/arfanovidev',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}