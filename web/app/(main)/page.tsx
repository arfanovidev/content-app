import type { Metadata } from 'next';
import { HomeClient } from './home-client';
import { HomeSections } from '@/components/home/HomeSections';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';

export const metadata: Metadata = {
  title: 'Content App — Bilingual Reading & Research Platform',
  description:
    'Read original English and Bengali articles, listen with native text-to-speech, save favorites, and track your reading progress. Free, ad-free, privacy-first.',
  keywords: [
    'bilingual reading', 'Bengali articles', 'English Bengali reading app',
    'text-to-speech Bengali', 'free reading platform', 'research platform',
    'ad-free reading', 'content app', 'বাংলা পড়া', 'দ্বিভাষিক প্ল্যাটফর্ম',
  ],
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/', 'bn-BD': '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    title: 'Content App — Bilingual Reading & Research Platform',
    description:
      'Read original English and Bengali articles, listen with native TTS, save favorites. Free, ad-free, privacy-first.',
    url: SITE_URL,
    siteName: 'Content App',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Content App' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content App — Bilingual Reading & Research Platform',
    description: 'Read original English and Bengali articles. Free, ad-free, privacy-first.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
      <HomeSections />
    </>
  );
}