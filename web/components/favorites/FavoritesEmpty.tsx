'use client';

import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useMessages } from '@/hooks/useMessages';

export function FavoritesEmpty() {
  const t = useMessages();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Heart className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight">
        {t.favorites.empty}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {t.favorites.emptyHint}
      </p>
      <Link
        href={ROUTES.HOME}
        className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
        {t.favorites.browse}
      </Link>
    </div>
  );
}