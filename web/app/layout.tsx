import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Bengali, Playfair_Display, Courier_Prime } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Toaster } from 'sonner';
import { Providers } from '@/components/common/Providers';
import { ContentProtection } from '@/components/security/ContentProtection';
import { UserKeyInit } from '@/components/common/UserKeyInit';
import { SignupModal } from '@/components/auth/SignupModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoBengali = Noto_Sans_Bengali({ subsets: ['bengali'], variable: '--font-bengali', weight: ['400','500','600','700'], display: 'swap', preload: false });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['600','700','900'], variable: '--font-playfair', display: 'swap' });
const courier = Courier_Prime({ subsets: ['latin'], weight: ['400','700'], variable: '--font-courier', display: 'swap' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';
const SITE_NAME = 'Content App';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Content App — Bilingual Reading & Research Platform',
    template: '%s · Content App',
  },
  description:
    'A calm, ad-free bilingual reading and research platform. Read original English and Bengali articles, listen with native text-to-speech, and save what matters.',
  applicationName: SITE_NAME,
  authors: [{ name: 'Content App Team', url: SITE_URL }],
  creator: 'Content App Team',
  publisher: 'Content App Team',
  keywords: [
    'bilingual reading', 'Bengali articles', 'English articles',
    'text-to-speech reading', 'research platform', 'Bangla content',
    'ad-free reading', 'Content App', 'বাংলা পড়া', 'দ্বিভাষিক প্ল্যাটফর্ম',
  ],
  category: 'Education',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'bn-BD': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Content App — Bilingual Reading & Research Platform',
    description:
      'Read original English and Bengali articles, listen with native TTS, save what matters. Free, ad-free, privacy-first.',
    url: SITE_URL,
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Content App — Bilingual Reading & Research Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content App — Bilingual Reading & Research Platform',
    description:
      'Read original English and Bengali articles, listen with native TTS, save what matters. Free, ad-free, privacy-first.',
    images: ['/og-image.png'],
    creator: '@contentapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png', sizes: 'any' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.variable} ${notoBengali.variable} ${playfair.variable} ${courier.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        {/* JSON-LD: Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}/logo.png`,
                sameAs: [
                  'https://twitter.com/contentapp',
                  'https://github.com/arfanovidev',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: SITE_NAME,
                url: SITE_URL,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: `${SITE_URL}/search?q={search_term_string}`,
                  'query-input': 'required name=search_term_string',
                },
                inLanguage: ['en', 'bn'],
              },
            ]),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ContentProtection />
          <Providers>
            <UserKeyInit />
            {children}
            <SignupModal />
          </Providers>
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{ classNames: { toast: 'rounded-xl border border-border bg-card text-foreground' } }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}