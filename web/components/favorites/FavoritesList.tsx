'use client';

import { useCompleted } from '@/hooks/useCompleted';
import { useContents } from '@/hooks/useContents';
import { useCategories } from '@/hooks/useCategories';
import { FavoriteCard } from './FavoriteCard';
import { FavoritesEmpty } from './FavoritesEmpty';
import { FavoritesSkeleton } from './FavoritesSkeleton';

export function FavoritesList() {
  const { data: records, isLoading: loadingRecords, isError: errorRecords } = useCompleted();
  const { data: contents, isLoading: loadingContents, isError: errorContents } = useContents();
  const { data: categories } = useCategories();

  // ✅ Server down হলেও infinite skeleton
  const showSkeleton =
    loadingRecords || loadingContents || errorRecords || errorContents;

  if (showSkeleton) {
    return <FavoritesSkeleton />;
  }

  if (!records || records.length === 0) {
    return <FavoritesEmpty />;
  }

  const contentsMap = new Map(contents?.map((c) => [c.id, c]) ?? []);
  const categoryMap = new Map(categories?.map((c) => [c.id, c]) ?? []);

  const items = records
    .map((record) => {
      const content = contentsMap.get(record.contentId);
      if (!content) return null;
      return {
        content,
        record,
        category: categoryMap.get(content.categoryId),
      };
    })
    .filter(Boolean) as Array<{
      content: any;
      record: any;
      category: any;
    }>;

  if (items.length === 0) {
    return <FavoritesEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map(({ content, record, category }) => (
        <FavoriteCard
          key={record.id}
          content={content}
          category={category}
          record={record}
        />
      ))}
    </div>
  );
}