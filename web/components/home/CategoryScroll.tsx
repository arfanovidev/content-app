'use client';

import { useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCategories } from '@/hooks/useCategories';
import { pickText } from '@/lib/format';
import { CategoryChip } from './CategoryChip';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryScrollProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryScroll({ selectedId, onSelect }: CategoryScrollProps) {
  const { data: categories, isLoading, isError } = useCategories();
  const locale = useLocale() as 'en' | 'bn';
  const t = useTranslations('home');
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedId || !scrollerRef.current) return;
    const el = scrollerRef.current.querySelector<HTMLElement>(
      `[data-cat-id="${selectedId}"]`
    );
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [selectedId]);

  if (isLoading || isError) {
    return (
      <div className="scrollbar-hide flex gap-1.5 overflow-x-auto py-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-7 w-16 shrink-0 rounded-full bg-muted/60" />
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />

      <div
        ref={scrollerRef}
        className="scrollbar-hide flex gap-1.5 overflow-x-auto px-1 py-1 snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch]"
      >
        <CategoryChip
          label={t('all')}
          active={selectedId === null}
          onClick={() => onSelect(null)}
          dataId="__all__"
        />
        {categories.map((cat) => (
          <CategoryChip
            key={cat.id}
            dataId={cat.id}
            label={pickText(cat.name, locale)}
            active={selectedId === cat.id}
            onClick={() => onSelect(cat.id)}
          />
        ))}
        <span className="shrink-0 w-2" aria-hidden />
      </div>
    </div>
  );
}