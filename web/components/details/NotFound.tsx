'use client';

import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useMessages } from '@/hooks/useMessages';

export function NotFound() {
  const t = useMessages();

  return (
    <div className="container mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileQuestion
          className="h-10 w-10 text-muted-foreground"
          strokeWidth={1.5}
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">
        {t.details.notFound}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t.details.notFoundHint}
      </p>
      <Link
        href={ROUTES.HOME}
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {t.details.backToHome}
      </Link>
    </div>
  );
}