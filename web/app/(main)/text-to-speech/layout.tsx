import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Text-to-Speech — Listen to English & Bengali Articles for Free',
  description:
    'Content App uses the browser native Web Speech API to read articles aloud in English and Bengali. Free, offline-capable, private — no TTS API bills.',
  keywords: [
    'text to speech Bengali', 'bengali TTS free', 'web speech API reading',
    'listen to articles', 'English Bengali TTS', 'browser text to speech',
    'free TTS reading app', 'bilingual text to speech',
  ],
  alternates: {
    canonical: '/text-to-speech',
    languages: {
      'en-US': '/text-to-speech',
      'bn-BD': '/text-to-speech',
      'x-default': '/text-to-speech',
    },
  },
  openGraph: {
    type: 'website',
    title: 'Text-to-Speech — Content App',
    description:
      'Listen to English and Bengali articles for free with the browser native Web Speech API.',
    url: `${SITE_URL}/text-to-speech`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Text-to-Speech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text-to-Speech — Content App',
    description: 'Listen to English and Bengali articles for free.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function TTSPageLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Content App Text-to-Speech',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web (any modern browser)',
    description:
      'Browser-native text-to-speech in English and Bengali, integrated into Content App reading experience.',
    url: `${SITE_URL}/text-to-speech`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: ['en', 'bn'],
    featureList: [
      'English text-to-speech',
      'Bengali text-to-speech',
      'Works offline in many browsers',
      'No paid TTS API',
      'Native Web Speech API',
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Content App',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
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