'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, Calendar } from 'lucide-react';

const POSTS = [
  { slug: 'why-no-ads', categoryKey: 'design', date: '2026-10-15', readTime: 5 },
  { slug: 'bilingual-ux', categoryKey: 'engineering', date: '2026-10-10', readTime: 7 },
  { slug: 'tts-web-speech', categoryKey: 'engineering', date: '2026-10-05', readTime: 6 },
  { slug: 'small-team-shipping', categoryKey: 'team', date: '2026-09-28', readTime: 4 },
  { slug: 'google-drive-as-db', categoryKey: 'engineering', date: '2026-09-20', readTime: 8 },
  { slug: 'reading-metrics', categoryKey: 'product', date: '2026-09-12', readTime: 5 },
];

const CATEGORY_KEYS = ['all', 'design', 'engineering', 'product', 'team'];

export default function BlogPage() {
  const t = useTranslations('blog');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? POSTS
    : POSTS.filter((p) => p.categoryKey === activeCategory);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORY_KEYS.map((key) => {
          const isActive = activeCategory === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {t(`categories.${key}`)}
            </button>
          );
        })}
      </div>

      {/* Posts list */}
      <div className="mt-10 divide-y divide-border border-t border-border">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {t('empty')}
          </p>
        )}

        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-6"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-foreground/80">
                {t(`categories.${post.categoryKey}`)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>·</span>
              <span>{t('readTime', { minutes: post.readTime })}</span>
            </div>

            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold leading-snug transition-colors group-hover:text-foreground/70">
                  {t(`posts.${post.slug.replace(/-/g, '')}.title`)}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`posts.${post.slug.replace(/-/g, '')}.excerpt`)}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}