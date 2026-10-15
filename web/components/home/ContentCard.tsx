'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants';
import { pickText, readTimeLabel } from '@/lib/format';
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

  return (
    <Link
      href={ROUTES.CONTENT(content.slug)}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {content.coverImage ? (
          <Image
            src={content.coverImage}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-3xl font-bold text-muted-foreground">
            {title.charAt(0).toUpperCase()}
          </div>
        )}

        {category && (
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 border-0 bg-background/90 text-xs font-medium shadow-sm backdrop-blur-sm"
          >
            <span className="mr-1">{category.icon}</span>
            {category.name[lang]}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="text-balance text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-lg line-clamp-2">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2 text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          <span>{readTimeLabel(content.readTime, lang)}</span>
        </div>
      </div>
    </Link>
  );
}