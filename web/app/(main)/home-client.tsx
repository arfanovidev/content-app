'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { HeroHeader } from '@/components/home/HeroHeader';
import { CategoryScroll } from '@/components/home/CategoryScroll';
import { SearchBar } from '@/components/home/SearchBar';
import { ContentGrid } from '@/components/home/ContentGrid';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';

export function HomeClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const hydrated = useAuthStore((s) => s._hasHydrated);

  if (!hydrated) {
    return <HomeSkeleton />;
  }

  if (!isAuth) {
    return <HeroHeader />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="sticky top-20 z-30 -mx-4 mb-4 border-b border-border/60 bg-background/90 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:top-24 sm:px-6">
          <CategoryScroll
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <ContentGrid categoryId={selectedCategory} searchQuery={searchQuery} />
      </div>
    </div>
  );
}