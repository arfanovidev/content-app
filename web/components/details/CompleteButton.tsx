'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  if (!visible && !isCompleted) return null;

  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-700 dark:text-green-400">
        <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
        <span>Completed! Added to favorites</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Ready to mark as complete?
      </p>
      <Button
        type="button"
        onClick={onClick}
        disabled={isPending}
        className="w-full rounded-lg"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
            Mark as Complete
          </>
        )}
      </Button>
    </div>
  );
}