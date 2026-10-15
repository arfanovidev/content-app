import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export function Logo() {
  return (
    <Link
      href={ROUTES.HOME}
      className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
    >
      <BookOpen className="h-6 w-6 text-primary" />
      <span className="hidden sm:inline">Content App</span>
    </Link>
  );
}
