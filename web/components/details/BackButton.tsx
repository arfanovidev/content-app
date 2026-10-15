'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useMessages } from '@/hooks/useMessages';

export function BackButton() {
  const t = useMessages();

  return (
    <Link
      href={ROUTES.HOME}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2} />
      <span>{t.details.back}</span>
    </Link>
  );
}