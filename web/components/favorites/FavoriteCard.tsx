'use client';

import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants';
import { formatDate, pickText, readTimeLabel } from '@/lib/format';
import { useLangStore } from '@/store/langStore';
import { VoteButtons } from './VoteButtons';
import type { Content, Category } from '@/types';
import type { CompletedRecord } from '@/hooks/useCompleted';

interface FavoriteCardProps {
  content: Content;
  category?: Category;
  record: CompletedRecord;
}

export function FavoriteCard({ content, category, record }: FavoriteCardProps) {
  const lang = useLangStore((s) => s.lang);
  const title = pickText(content.title, lang);
  const description = pickText(content.shortDescription, lang);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      <Link href={ROUTES.CONTENT(content.slug)} className="block p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {category && (
            <Badge variant="secondary" className="rounded-full px-2.5 py-0.5">
              <span className="mr-1">{category.icon}</span>
              {category.name[lang]}
            </Badge>
          )}
        </div>

        <h3 className="mt-3 text-balance text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-lg line-clamp-2">
          {title}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            {readTimeLabel(content.readTime, lang)}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            {formatDate(record.completedAt, lang)}
          </span>
        </div>
      </Link>

      <div className="border-t border-border/60 px-4 py-3 sm:px-5">
        <VoteButtons contentId={content.id} />
      </div>
    </div>
  );
}