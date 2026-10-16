'use client';

import { FileText } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

export function EmptyState() {
  const t = useMessages();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <FileText className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight">
        {t.home.noContent}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {t.home.noContentHint}
      </p>
    </div>
  );
}