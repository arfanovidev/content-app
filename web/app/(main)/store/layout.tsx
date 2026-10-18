import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Store — Minimal Merchandise for Readers (Coming Soon)',
  description:
    'Content App merchandise — a ceramic mug, a t-shirt, and a dot-grid notebook. Simple products for slow mornings and thoughtful reading. Opening soon.',
  keywords: [
    'Content App store', 'reading merch', 'bilingual reading merchandise',
    'notebook reading app', 'ceramic mug', 'dot grid notebook',
  ],
  alternates: {
    canonical: '/store',
    languages: { 'en-US': '/store', 'bn-BD': '/store', 'x-default': '/store' },
  },
  openGraph: {
    type: 'website',
    title: 'Store — Content App',
    description: 'Minimal merchandise for readers. Opening soon.',
    url: `${SITE_URL}/store`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Content App Store' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Store — Content App',
    description: 'Minimal merchandise for readers. Opening soon.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Content App Store',
    url: `${SITE_URL}/store`,
    description: 'Minimal merchandise for readers — mugs, notebooks, and t-shirts.',
    image: `${SITE_URL}/og-image.png`,
    priceRange: '৳৳',
    currenciesAccepted: 'BDT',
    paymentAccepted: 'bKash, Cash',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}