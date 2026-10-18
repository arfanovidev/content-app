'use client';

import { use } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Calendar } from 'lucide-react';

const POSTS = [
  { slug: 'why-no-ads', categoryKey: 'design', date: '2026-10-15', readTime: 5 },
  { slug: 'bilingual-ux', categoryKey: 'engineering', date: '2026-10-10', readTime: 7 },
  { slug: 'tts-web-speech', categoryKey: 'engineering', date: '2026-10-05', readTime: 6 },
  { slug: 'small-team-shipping', categoryKey: 'team', date: '2026-09-28', readTime: 4 },
  { slug: 'google-drive-as-db', categoryKey: 'engineering', date: '2026-09-20', readTime: 8 },
  { slug: 'reading-metrics', categoryKey: 'product', date: '2026-09-12', readTime: 5 },
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations('blog');
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm text-muted-foreground">{t('notFound')}</p>
        <Link
          href="/blog"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToBlog')}
        </Link>
      </div>
    );
  }

  const key = post.slug.replace(/-/g, '');
  const title = t(`posts.${key}.title`);
  const excerpt = t(`posts.${key}.excerpt`);
  const body = t(`posts.${key}.body`);

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('backToBlog')}
      </Link>

      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
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

      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h1>

      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {excerpt}
      </p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed sm:text-base">
        {body.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}