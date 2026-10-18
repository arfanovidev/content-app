'use client';

import { CheckCircle2, Loader2, Bookmark } from 'lucide-react';
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

  if (!visible && !isCompleted) return null;

  if (isCompleted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-medium">
          {t.details?.completed || 'Completed'}
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      style={{
        minHeight: '52px',
        minWidth: '100%',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-md transition-all duration-150 hover:bg-primary/90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>{t.reading?.saving || 'Saving...'}</span>
        </>
      ) : (
        <>
          <Bookmark className="h-5 w-5" />
          <span>{t.details?.markComplete || 'Mark as Complete'}</span>
        </>
      )}
    </button>
  );
}