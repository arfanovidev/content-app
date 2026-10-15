'use client';

import { useMessages } from '@/hooks/useMessages';
import { useLangStore } from '@/store/langStore';
import { useCategories } from '@/hooks/useCategories';
import { CategoryChip } from './CategoryChip';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryScrollProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryScroll({ selectedId, onSelect }: CategoryScrollProps) {
  const { data: categories, isLoading } = useCategories();
  const lang = useLangStore((s) => s.lang);
  const t = useMessages();

  if (isLoading) {
    return (
      <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0">
      <CategoryChip
        label={t.home.all}
        active={selectedId === null}
        onClick={() => onSelect(null)}
      />
      {categories.map((cat) => (
        <CategoryChip
          key={cat.id}
          label={cat.icon ? `${cat.icon} ${cat.name[lang]}` : cat.name[lang]}
          active={selectedId === cat.id}
          onClick={() => onSelect(cat.id)}
        />
      ))}
    </div>
  );
}
