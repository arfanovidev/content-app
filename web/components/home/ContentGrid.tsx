'use client';

import { useMemo } from 'react';
import { useContents } from '@/hooks/useContents';
import { useCategories } from '@/hooks/useCategories';
import { ContentCard } from './ContentCard';
import { CardSkeleton } from './CardSkeleton';
import { EmptyState } from './EmptyState';

interface ContentGridProps {
  categoryId: string | null;
  searchQuery?: string;
}

function textOf(v: { en: string; bn: string } | undefined | null): string {
  if (!v) return '';
  return `${v.en ?? ''} ${v.bn ?? ''}`;
}

export function ContentGrid({ categoryId, searchQuery = '' }: ContentGridProps) {
  const { data: contents, isLoading, isError } = useContents(categoryId ?? undefined);
  const { data: categories } = useCategories();

  const filtered = useMemo(() => {
    if (!contents) return [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return contents;
    return contents.filter((c) => {
      const blob = (textOf(c.title) + ' ' + textOf(c.shortDescription)).toLowerCase();
      return blob.includes(q);
    });
  }, [contents, searchQuery]);

  if (isLoading || isError) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return <EmptyState />;
  }

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No results for "{searchQuery}"
      </div>
    );
  }

  const categoryMap = new Map(categories?.map((c) => [c.id, c]) ?? []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((content, index) => (
        <ContentCard
          key={content.id}
          content={content}
          category={categoryMap.get(content.categoryId)}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
