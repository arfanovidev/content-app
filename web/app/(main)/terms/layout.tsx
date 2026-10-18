import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Terms of Service — Rules for Using Content App',
  description:
    'The terms that explain the rules of using Content App: acceptable use, content ownership, privacy, liability, and how we update these terms.',
  keywords: [
    'Content App terms', 'terms of service', 'user agreement',
    'acceptable use policy', 'content ownership', 'reading app terms',
  ],
  alternates: {
    canonical: '/terms',
    languages: { 'en-US': '/terms', 'bn-BD': '/terms', 'x-default': '/terms' },
  },
  openGraph: {
    type: 'website',
    title: 'Terms of Service — Content App',
    description: 'The rules for using Content App — clearly explained.',
    url: `${SITE_URL}/terms`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — Content App',
    description: 'The rules for using Content App — clearly explained.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service — Content App',
    url: `${SITE_URL}/terms`,
    description: 'Rules, acceptable use, ownership, and liability for Content App.',
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