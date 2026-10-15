'use client';

import { useState } from 'react';
import { CategoryScroll } from '@/components/home/CategoryScroll';
import { ContentGrid } from '@/components/home/ContentGrid';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="space-y-6 sm:space-y-8">
        <CategoryScroll
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ContentGrid categoryId={selectedCategory} />
      </div>
    </div>
  );
}
