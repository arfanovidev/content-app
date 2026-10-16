'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { pickText, readTimeLabel, normalizeImageUrl } from '@/lib/format';
import { useLangStore } from '@/store/langStore';
import type { Content, Category } from '@/types';

interface ContentCardProps {
  content: Content;
  category?: Category;
  priority?: boolean;
}

export function ContentCard({ content, category, priority }: ContentCardProps) {
  const lang = useLangStore((s) => s.lang);
  const title = pickText(content.title, lang);
  const description = pickText(content.shortDescription, lang);
  const imageUrl = normalizeImageUrl(content.coverImage);

  return (
    <Link
      href={ROUTES.CONTENT(content.slug)}
      className="group flex flex-row items-stretch gap-3 overflow-hidden rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
    >
      <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-28">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority={priority}
            sizes="112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-2xl font-bold text-muted-foreground">
            {title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="space-y-1">
          {category && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
              {category.name[lang]}
            </span>
          )}

          <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-base">
            {title}
          </h3>

          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{readTimeLabel(content.readTime, lang)}</span>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}