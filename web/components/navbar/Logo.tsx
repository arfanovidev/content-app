import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export function Logo() {
  return (
    <Link
      href={ROUTES.HOME}
      className="group flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <BookOpen className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="hidden text-base font-bold tracking-tight sm:inline">
        Content App
      </span>
    </Link>
  );
}
