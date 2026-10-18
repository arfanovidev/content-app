'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { ROUTES } from '@/lib/constants';
import { pickText, readTimeLabel, normalizeImageUrl } from '@/lib/format';
import type { Content, Category } from '@/types';

interface ContentCardProps {
  content: Content;
  category?: Category;
  priority?: boolean;
}

export function ContentCard({ content, category, priority }: ContentCardProps) {
  const locale = useLocale() as 'en' | 'bn';
  const title = pickText(content.title, locale);
  const description = pickText(content.shortDescription, locale);
  const imageUrl = normalizeImageUrl(content.coverImage);

  return (
    <Link
      href={ROUTES.CONTENT(content.slug)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      {/* Cover image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/30 text-5xl font-bold text-primary">
            {title.charAt(0).toUpperCase()}
          </div>
        )}
        {/* Category badge overlay */}
        {category && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary backdrop-blur-sm">
            {pickText(category.name, locale)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-lg">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{readTimeLabel(content.readTime, locale)}</span>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}