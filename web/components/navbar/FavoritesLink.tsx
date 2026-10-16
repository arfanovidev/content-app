'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useCompletedStore } from '@/store/completedStore';

export function FavoritesLink() {
  const count = useCompletedStore((s) => s.completed.length);

  if (count === 0) return null;

  return (
    <Link
      href={ROUTES.FAVORITES}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Favorites"
    >
      <Heart className="h-5 w-5" strokeWidth={2} />
      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
        {count}
      </span>
    </Link>
  );
}