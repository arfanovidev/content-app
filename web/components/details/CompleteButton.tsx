'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

interface CompleteButtonProps {
  visible: boolean;
  isCompleted: boolean;
  isPending: boolean;
  onClick: () => void;
}

export function CompleteButton({
  visible,
  isCompleted,
  isPending,
  onClick,
}: CompleteButtonProps) {
  const t = useMessages();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isCompleted) return;
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 2500);
    return () => clearTimeout(timer);
  }, [isCompleted]);

  if (isCompleted && !showSuccess) {
    return null;
  }

  if (isCompleted && showSuccess) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-700 dark:text-green-400">
        <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
        <span>{t.reading?.completed || 'Completed! Added to favorites'}</span>
      </div>
    );
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {t.reading?.saving || 'Saving...'}
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
          {t.reading?.complete || 'Mark as Complete'}
        </>
      )}
    </button>
  );
}