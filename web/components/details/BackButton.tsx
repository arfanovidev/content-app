'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

export function BackButton() {
  const t = useMessages();

  return (
    <Link
      href="/"
      className="inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:bg-accent"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2} />
      <span>{t.details?.back || 'Back'}</span>
    </Link>
  );
}