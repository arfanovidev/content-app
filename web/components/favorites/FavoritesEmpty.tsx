'use client';

import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useMessages } from '@/hooks/useMessages';

export function FavoritesEmpty() {
  const t = useMessages();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/30 px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Heart className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {t.favorites.empty}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        {t.favorites.emptyHint}
      </p>
      <Link
        href={ROUTES.HOME}
        className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
        {t.favorites.browse}
      </Link>
    </div>
  );
}