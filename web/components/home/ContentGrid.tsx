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
  const { data: contents, isLoading, isError } = useContents(categoryId ?? undefined);
  const { data: categories } = useCategories();

  // ✅ Server down / fetching / error — সব ক্ষেত্রে infinite skeleton
  if (isLoading || isError) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((i) => (
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
    <div className="grid grid-cols-1 gap-4">
      {contents.map((content, index) => (
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