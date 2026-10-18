import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Donate — Support a Free, Ad-Free Bilingual Reading Platform',
  description:
    'Help keep Content App free, ad-free, and bilingual. Your contribution covers hosting, content, and engineering costs — no subscriptions, no paywalls, no ads.',
  keywords: [
    'donate Content App', 'support bilingual reading', 'ad-free reading donation',
    'Bangla content donation', 'bKash donate', 'free reading platform',
    'independent content platform support',
  ],
  alternates: {
    canonical: '/donate',
    languages: { 'en-US': '/donate', 'bn-BD': '/donate', 'x-default': '/donate' },
  },
  openGraph: {
    type: 'website',
    title: 'Donate — Content App',
    description:
      'Help keep Content App free, ad-free, and bilingual. Every contribution matters.',
    url: `${SITE_URL}/donate`,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Support Content App' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donate — Content App',
    description: 'Help keep Content App free, ad-free, and bilingual.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: 'Where does my donation go?',
    a: 'Hosting, content writing, and engineering time. There is no office, no marketing budget, no VC. Every taka goes to keeping the platform running.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Content App is an independent project, not a registered charity. Donations are personal contributions, not tax-deductible gifts.',
  },
  {
    q: 'Can I donate in a currency other than BDT?',
    a: 'Yes. We accept bKash (BDT) for local supporters, and bank transfer / Wise for international supporters. Email us for details.',
  },
  {
    q: 'Will donating unlock extra features?',
    a: 'No. Content App is the same for everyone — free, ad-free, bilingual. Donations are support, not a subscription.',
  },
];

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Support Content App',
      url: `${SITE_URL}/donate`,
      description:
        'Help keep Content App free, ad-free, and bilingual with a voluntary donation.',
      inLanguage: ['en', 'bn'],
      isPartOf: { '@type': 'WebSite', name: 'Content App', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];

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