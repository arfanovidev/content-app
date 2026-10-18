import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://contentapp.dev';
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://content-api-f32c.onrender.com/api';

const STATIC_PAGES: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/careers', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/donate', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/help', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/rules', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/press', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/status', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/store', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/text-to-speech', priority: 0.7, changeFrequency: 'monthly' },
];

const BLOG_SLUGS = [
  'why-no-ads',
  'bilingual-ux',
  'tts-web-speech',
  'small-team-shipping',
  'google-drive-as-db',
  'reading-metrics',
];

async function fetchContentSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${API_URL}/contents`, {
      next: { revalidate: 3600 }, // 1 hour cache
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{ slug: string; updatedAt: string }>;
    return data.map((c) => ({ slug: c.slug, updatedAt: c.updatedAt }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const contentSlugs = await fetchContentSlugs();
  const contentEntries: MetadataRoute.Sitemap = contentSlugs.map((c) => ({
    url: `${SITE_URL}/content/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...blogEntries, ...contentEntries];
}