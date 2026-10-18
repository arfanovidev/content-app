import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Privacy Policy — How Content App Handles Your Data',
  description:
    'Content App collects the minimum data needed to run the service: an email, a username, and your reading progress. No ads, no trackers, no data selling.',
  keywords: [
    'Content App privacy', 'privacy policy', 'bilingual reading privacy',
    'no tracking reading app', 'data protection', 'GDPR-friendly reading app',
  ],
  alternates: {
    canonical: '/privacy',
    languages: { 'en-US': '/privacy', 'bn-BD': '/privacy', 'x-default': '/privacy' },
  },
  openGraph: {
    type: 'website',
    title: 'Privacy Policy — Content App',
    description: 'No ads, no trackers, no data selling. Here is exactly what we collect and why.',
    url: `${SITE_URL}/privacy`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Content App',
    description: 'No ads, no trackers, no data selling.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy — Content App',
    url: `${SITE_URL}/privacy`,
    description: 'How Content App collects, uses, and protects reader data.',
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