'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
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
    <div className="rounded-xl border border-border bg-card transition-colors hover:border-primary/40">
      <Link
        href={ROUTES.CONTENT(content.slug)}
        className="flex gap-3 p-3"
      >
        <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-24">
          {content.coverImage ? (
            <Image
              src={content.coverImage}
              alt={title}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xl font-bold text-muted-foreground">
              {title.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {category && (
            <span className="text-xs font-medium text-muted-foreground">
              {category.name[lang]}
            </span>
          )}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight sm:text-base">
            {title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground sm:text-sm">
            {description}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={2} />
              {readTimeLabel(content.readTime, lang)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" strokeWidth={2} />
              {formatDate(record.completedAt, lang)}
            </span>
          </div>
        </div>
      </Link>

      <div className="border-t border-border px-3 py-2">
        <VoteButtons contentId={content.id} />
      </div>
    </div>
  );
}