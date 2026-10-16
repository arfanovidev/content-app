'use client';

import { Clock, Calendar, User, Tag } from 'lucide-react';
import { formatDate, pickText, readTimeLabel } from '@/lib/format';
import { useLangStore } from '@/store/langStore';
import { useMessages } from '@/hooks/useMessages';
import type { Content, Category } from '@/types';

interface DetailsHeaderProps {
  content: Content;
  category?: Category;
}

export function DetailsHeader({ content, category }: DetailsHeaderProps) {
  const lang = useLangStore((s) => s.lang);
  const t = useMessages();

  const title = pickText(content.title, lang);
  const description = pickText(content.shortDescription, lang);
  const categoryName = category ? pickText(category.name, lang) : null;
  const tags = content.tags ?? [];

  return (
    <header className="space-y-4">
      {(categoryName || tags.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {categoryName && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {categoryName}
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              <Tag className="h-3 w-3" strokeWidth={2} />
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
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
            <span>
              {t.details?.by || 'By'} {content.author}
            </span>
          </div>
        )}
        <div className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          <span>{readTimeLabel(content.readTime, lang)}</span>
        </div>
        {content.publishedAt && (
          <div className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{formatDate(content.publishedAt, lang)}</span>
          </div>
        )}
      </div>
    </header>
  );
}