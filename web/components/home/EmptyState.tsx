'use client';

import { FileText } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

export function EmptyState() {
  const t = useMessages();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/30 px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FileText className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {t.home.noContent}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        {t.home.noContentHint}
      </p>
    </div>
  );
}
