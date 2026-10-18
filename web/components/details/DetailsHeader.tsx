'use client';

import { Clock, Calendar, User, Tag } from 'lucide-react';
import { useLocale } from 'next-intl';
import { formatDate, pickText, readTimeLabel } from '@/lib/format';
import { useMessages } from '@/hooks/useMessages';
import type { Content, Category } from '@/types';

interface DetailsHeaderProps {
  content: Content;
  category?: Category;
}

export function DetailsHeader({ content, category }: DetailsHeaderProps) {
  const locale = useLocale() as 'en' | 'bn';
  const t = useMessages();

  const title = pickText(content.title, locale);
  const description = pickText(content.shortDescription, locale);
  const categoryName = category ? pickText(category.name, locale) : null;
  const tags = content.tags ?? [];

  return (
    <header className="space-y-4">
      {(categoryName || tags.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {categoryName && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {categoryName}
            </span>
          )}
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              <Tag className="h-3 w-3" strokeWidth={2} />
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title || 'Untitled'}
      </h1>

      {description && (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {content.author && (
          <div className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{t.details?.by || 'By'} {content.author}</span>
          </div>
        )}
        <div className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          <span>{readTimeLabel(content.readTime, locale)}</span>
        </div>
        {content.publishedAt && (
          <div className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{formatDate(content.publishedAt, locale)}</span>
          </div>
        )}
      </div>
    </header>
  );
}