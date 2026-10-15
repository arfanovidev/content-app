'use client';

import { useMessages } from '@/hooks/useMessages';
import { FavoritesList } from '@/components/favorites/FavoritesList';

export default function FavoritesPage() {
  const t = useMessages();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t.favorites.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.favorites.subtitle}
          </p>
        </div>

        <FavoritesList />
      </div>
    </div>
  );
}