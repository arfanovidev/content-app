'use client';

import { useContents } from '@/hooks/useContents';
import { useCategories } from '@/hooks/useCategories';
import { ContentCard } from './ContentCard';
import { CardSkeleton } from './CardSkeleton';
import { EmptyState } from './EmptyState';

interface ContentGridProps {
  categoryId: string | null;
}

export function ContentGrid({ categoryId }: ContentGridProps) {
  const { data: contents, isLoading } = useContents(categoryId ?? undefined);
  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return <EmptyState />;
  }

  const categoryMap = new Map(categories?.map((c) => [c.id, c]) ?? []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {contents.map((content) => (
        <ContentCard
          key={content.id}
          content={content}
          category={categoryMap.get(content.categoryId)}
        />
      ))}
    </div>
  );
}
