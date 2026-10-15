'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { useMessages } from '@/hooks/useMessages';

export function BackButton() {
  const t = useMessages();

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="h-9 gap-1.5 rounded-lg px-2.5 text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      <Link href={ROUTES.HOME}>
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        <span className="text-sm font-medium">{t.details.back}</span>
      </Link>
    </Button>
  );
}
