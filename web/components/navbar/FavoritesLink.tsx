'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useCompletedStore } from '@/store/completedStore';
import { useMessages } from '@/hooks/useMessages';

export function FavoritesLink() {
  const count = useCompletedStore((s) => s.completed.length);
  const t = useMessages();

  if (count === 0) return null;

  return (
    <Link
      href={ROUTES.FAVORITES}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Heart className="h-4 w-4" strokeWidth={2} />
      <span className="hidden sm:inline">{t.nav.favorites}</span>
      <span className="rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
        {count}
      </span>
    </Link>
  );
}