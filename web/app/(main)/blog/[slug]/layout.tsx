import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

type PostMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: number;
  keywords: string[];
};

const POSTS: Record<string, PostMeta> = {
  'why-no-ads': {
    title: 'Why we built Content App without ads',
    description:
      'The web is full of noise. Here is our thinking behind an ad-free reading platform, and why reader support is the only funding model we trust.',
    date: '2026-10-15',
    category: 'Design',
    readTime: 5,
    keywords: ['ad-free reading', 'content app philosophy', 'reader support', 'no tracking'],
  },
  'bilingual-ux': {
    title: 'Designing for bilingual readers',
    description:
      'How we handled English and Bengali side-by-side — without auto-translation, without awkward layouts, and without pretending one language is primary.',
    date: '2026-10-10',
    category: 'Engineering',
    readTime: 7,
    keywords: ['bilingual design', 'Bengali typography', 'English Bengali UI', 'dual-language reading'],
  },
  'tts-web-speech': {
    title: 'Text-to-speech without an API bill',
    description:
      'How the Web Speech API lets us read articles aloud in two languages — for free, offline, and privately, without paying for a TTS service.',
    date: '2026-10-05',
    category: 'Engineering',
    readTime: 6,
    keywords: ['web speech API', 'browser TTS', 'free text-to-speech', 'Bengali TTS'],
  },
  'small-team-shipping': {
    title: 'What we learned shipping with a tiny team',
    description:
      'Priorities, trade-offs, and the things we said no to while building Content App with a small, independent team.',
    date: '2026-09-28',
    category: 'Team',
    readTime: 4,
    keywords: ['small team product', 'indie app', 'shipping discipline', 'product tradeoffs'],
  },
  'google-drive-as-db': {
    title: 'Using Google Drive as a database (really)',
    description:
      'Why we chose a simple JSON-on-Drive backend for a small content platform — and when you should not.',
    date: '2026-09-20',
    category: 'Engineering',
    readTime: 8,
    keywords: ['google drive database', 'json backend', 'small platform backend', 'unconventional stack'],
  },
  'reading-metrics': {
    title: 'Reading metrics that actually matter',
    description:
      'Percentages, streaks, and why we skip "time on site" — a short essay on measuring reading without spying on readers.',
    date: '2026-09-12',
    category: 'Product',
    readTime: 5,
    keywords: ['reading analytics', 'privacy-first metrics', 'product metrics', 'reader respect'],
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return {
      title: 'Post not found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        'en-US': `/blog/${slug}`,
        'bn-BD': `/blog/${slug}`,
        'x-default': `/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'Content App',
      locale: 'en_US',
      alternateLocale: ['bn_BD'],
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      authors: ['Content App Team'],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og-image.png'],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];

  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        url: `${SITE_URL}/blog/${slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
        author: { '@type': 'Organization', name: 'Content App', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Content App',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
        },
        articleSection: post.category,
        timeRequired: `PT${post.readTime}M`,
        inLanguage: 'en',
        image: `${SITE_URL}/og-image.png`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}