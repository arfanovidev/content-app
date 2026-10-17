import type { Metadata } from 'next';

const SITE = 'https://content-app-gamma.vercel.app';

export function docMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = `${SITE}${path}`;
  return {
    title: `${title} | Content App Docs`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Content App Docs`,
      description,
      url,
      siteName: 'Content App',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${title} | Content App Docs`,
      description,
    },
    robots: { index: true, follow: true },
  };
}