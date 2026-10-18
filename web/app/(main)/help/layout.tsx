import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Help — Guides for Reading, Listening, and Using Content App',
  description:
    'How to read, listen with text-to-speech, save favorites, switch languages, and get the most out of Content App — a bilingual reading and research platform.',
  keywords: [
    'Content App help', 'how to read Content App', 'text-to-speech help',
    'bilingual reading guide', 'Bengali reading app help', 'switch language reading app',
    'save favorites reading app',
  ],
  alternates: {
    canonical: '/help',
    languages: { 'en-US': '/help', 'bn-BD': '/help', 'x-default': '/help' },
  },
  openGraph: {
    type: 'website',
    title: 'Help — Content App',
    description: 'Guides for reading, listening, and using Content App.',
    url: `${SITE_URL}/help`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Content App Help' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help — Content App',
    description: 'Guides for reading, listening, and using Content App.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Help — Content App',
    url: `${SITE_URL}/help`,
    description:
      'Guides for reading, listening with text-to-speech, saving favorites, and switching languages on Content App.',
    inLanguage: ['en', 'bn'],
    isPartOf: { '@type': 'WebSite', name: 'Content App', url: SITE_URL },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I listen to an article?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Open any article and tap the play button near the top. The browser reads the text aloud in English or Bengali, depending on the language of the article.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I switch between English and Bengali?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the language toggle in the top navigation. Articles with both languages will switch instantly, and your reading position is preserved.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I save a favorite?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tap the bookmark icon on any article, or mark it complete from the reading view. Your favorites appear under Favorites in the navigation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need an account to read?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Public stories are free to read without an account. To save favorites, track progress, and pick up where you left off, create a free account.',
          },
        },
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