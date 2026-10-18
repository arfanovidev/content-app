'use client';

import { useTranslations } from 'next-intl';
import { FavoritesList } from '@/components/favorites/FavoritesList';

export default function FavoritesPage() {
  const t = useTranslations('favorites');

  return (
    <div className="container mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t('title')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <FavoritesList />
      </div>
    </div>
  );
}