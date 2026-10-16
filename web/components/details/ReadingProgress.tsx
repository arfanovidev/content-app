'use client';

import { useEffect, useState } from 'react';
import { useCompletedStore } from '@/store/completedStore';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  /** Content ID — completion state lookup করবে */
  contentId?: string;
  /** Explicit progress value (0-100) — override everything */
  progress?: number;
  /** 'bar' | 'text-only' */
  variant?: 'bar' | 'text-only';
  className?: string;
}

export function ReadingProgress({
  contentId,
  progress: externalProgress,
  variant = 'bar',
  className,
}: ReadingProgressProps) {
  // ✅ Subscribe to completed store — re-renders when completed list changes
  const isCompleted = useCompletedStore((s) => {
    if (!contentId) return false;
    return s.completed.some((c) => c.contentId === contentId);
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll-based reading progress (only when not completed)
  useEffect(() => {
    if (externalProgress !== undefined) return;
    if (isCompleted) {
      setScrollProgress(100);
      return;
    }

    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? Math.round((el.scrollTop / total) * 100) : 0;
      setScrollProgress(Math.min(100, Math.max(0, pct)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [externalProgress, isCompleted]);

  // ✅ Priority: explicit > completed (100) > scroll
  const raw =
    externalProgress !== undefined
      ? externalProgress
      : isCompleted
        ? 100
        : scrollProgress;

  const pct = Math.min(100, Math.max(0, Math.round(raw)));

  if (variant === 'text-only') {
    return (
      <span
        className={cn(
          'inline-flex items-center font-medium tabular-nums',
          isCompleted && 'text-primary',   // ✅ completed হলে primary color
          className
        )}
        aria-label={`Reading progress ${pct}%`}
      >
        {pct}%
      </span>
    );
  }

  return (
    <div
      className={cn('h-1 w-full overflow-hidden rounded-full bg-muted', className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}