import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Careers — Build a Calm, Bilingual Reading Platform',
  description:
    'Join a small, independent team building Content App — a bilingual (English + Bengali) reading and research platform with no ads, no tracking, and native text-to-speech. Remote-friendly.',
  keywords: [
    'Content App careers', 'remote engineering jobs', 'bilingual product designer',
    'Next.js jobs', 'NestJS jobs', 'content writer jobs', 'Bengali content writer',
    'indie product team', 'remote reading platform jobs',
  ],
  alternates: {
    canonical: '/careers',
    languages: { 'en-US': '/careers', 'bn-BD': '/careers', 'x-default': '/careers' },
  },
  openGraph: {
    type: 'website',
    title: 'Careers — Content App',
    description:
      'Join a small, independent team building a bilingual reading platform. Remote-first, async-friendly.',
    url: `${SITE_URL}/careers`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Careers at Content App' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers — Content App',
    description: 'Join a small, independent team building a bilingual reading platform.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const JOBS = [
  {
    title: 'Full-stack Engineer',
    description:
      'Help build fast, accessible reading experiences with Next.js and NestJS. Remote, full-time.',
    datePosted: '2026-10-01',
    employmentType: 'FULL_TIME',
    department: 'Engineering',
  },
  {
    title: 'Content Writer (Bangla)',
    description:
      'Write original Bangla stories on technology, culture, and daily life. Remote, part-time.',
    datePosted: '2026-10-01',
    employmentType: 'PART_TIME',
    department: 'Content',
  },
  {
    title: 'Content Writer (English)',
    description:
      'Craft English essays that respect the reader time and attention. Remote, part-time.',
    datePosted: '2026-10-01',
    employmentType: 'PART_TIME',
    department: 'Content',
  },
];

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers at Content App',
    description:
      'Open roles at Content App — a bilingual reading and research platform.',
    url: `${SITE_URL}/careers`,
    inLanguage: ['en', 'bn'],
    isPartOf: { '@type': 'WebSite', name: 'Content App', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: JOBS.map((job, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'JobPosting',
          title: job.title,
          description: job.description,
          datePosted: job.datePosted,
          employmentType: job.employmentType,
          industry: 'Education',
          occupationalCategory: job.department,
          hiringOrganization: {
            '@type': 'Organization',
            name: 'Content App',
            sameAs: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
          },
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: {
            '@type': 'Country',
            name: 'Worldwide',
          },
          directApply: false,
          url: `${SITE_URL}/careers`,
        },
      })),
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