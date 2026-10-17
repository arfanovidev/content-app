'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { HeroHeader } from '@/components/home/HeroHeader';
import { CategoryScroll } from '@/components/home/CategoryScroll';
import { ContentGrid } from '@/components/home/ContentGrid';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const hydrated = useAuthStore((s) => s._hasHydrated);

  // ⏳ Wait for store hydration (avoids flicker)
  if (!hydrated) {
    return <HomeSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero — show only when NOT authenticated */}
      {!isAuth && <HeroHeader />}

      {/* Content — show only when authenticated */}
      {isAuth ? (
        <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="sticky top-14 z-30 -mx-4 mb-4 border-b border-border/60 bg-background/90 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:top-16 sm:px-6">
            <CategoryScroll
              selectedId={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <ContentGrid categoryId={selectedCategory} />
        </div>
      ) : (
        <div className="container mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <p className="text-sm text-muted-foreground">
            Sign up to explore stories and categories.
          </p>
        </div>
      )}
    </div>
  );
}