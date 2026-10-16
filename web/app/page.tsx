'use client';

import { useState } from 'react';
import { CategoryScroll } from '@/components/home/CategoryScroll';
import { ContentGrid } from '@/components/home/ContentGrid';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6">
      <div className="space-y-5">
        <CategoryScroll
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ContentGrid categoryId={selectedCategory} />
      </div>
    </div>
  );
}