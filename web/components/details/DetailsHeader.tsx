'use client';

import { Clock, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

  return (
    <header className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            <span className="mr-1">{category.icon}</span>
            {category.name[lang]}
          </Badge>
        )}
        {content.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="rounded-full px-3 py-1 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      <p className="text-balance text-lg text-muted-foreground">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <User className="h-4 w-4" strokeWidth={2} />
          <span>
            {t.details.by} {content.author}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" strokeWidth={2} />
          <span>{readTimeLabel(content.readTime, lang)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" strokeWidth={2} />
          <span>{formatDate(content.publishedAt, lang)}</span>
        </div>
      </div>
    </header>
  );
}
