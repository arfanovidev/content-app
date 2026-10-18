import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Blog — Notes on Bilingual Reading & Product Design',
  description:
    'Essays on building a calm, bilingual reading platform: why we ditched ads, how we design for English and Bengali, and why we use the browser for text-to-speech.',
  keywords: [
    'Content App blog', 'bilingual reading essays', 'ad-free platform',
    'bilingual UX design', 'web speech API', 'indie product blog',
    'reading platform engineering', 'Bengali English product design',
  ],
  alternates: {
    canonical: '/blog',
    languages: { 'en-US': '/blog', 'bn-BD': '/blog', 'x-default': '/blog' },
  },
  openGraph: {
    type: 'website',
    title: 'Blog — Content App',
    description:
      'Essays on building a calm, bilingual reading platform with no ads, native TTS, and careful design.',
    url: `${SITE_URL}/blog`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Content App Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Content App',
    description: 'Essays on bilingual reading and thoughtful product design.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const POSTS_FOR_SCHEMA = [
  { slug: 'why-no-ads', title: 'Why we built Content App without ads', date: '2026-10-15' },
  { slug: 'bilingual-ux', title: 'Designing for bilingual readers', date: '2026-10-10' },
  { slug: 'tts-web-speech', title: 'Text-to-speech without an API bill', date: '2026-10-05' },
  { slug: 'small-team-shipping', title: 'What we learned shipping with a tiny team', date: '2026-09-28' },
  { slug: 'google-drive-as-db', title: 'Using Google Drive as a database (really)', date: '2026-09-20' },
  { slug: 'reading-metrics', title: 'Reading metrics that actually matter', date: '2026-09-12' },
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Content App Blog',
    description: 'Essays on bilingual reading, product design, and building a calm content platform.',
    url: `${SITE_URL}/blog`,
    inLanguage: ['en', 'bn'],
    publisher: {
      '@type': 'Organization',
      name: 'Content App',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    blogPost: POSTS_FOR_SCHEMA.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Organization', name: 'Content App' },
    })),
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