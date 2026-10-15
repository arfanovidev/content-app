'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useCastVote, useVoteTally } from '@/hooks/useVote';

interface VoteButtonsProps {
  contentId: string;
}

export function VoteButtons({ contentId }: VoteButtonsProps) {
  const { data: tally, isLoading } = useVoteTally(contentId);
  const castVote = useCastVote();
  const [pendingValue, setPendingValue] = useState<1 | -1 | null>(null);

  if (isLoading || !tally) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-7 w-8 animate-pulse rounded-md bg-muted" />
        <span className="h-7 w-8 animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  const userVote = tally.userVote ?? 0;

  const handleVote = (value: 1 | -1) => {
    setPendingValue(value);
    castVote.mutate(
      { contentId, value },
      { onSettled: () => setPendingValue(null) },
    );
  };

  return (
    <div
      className="flex items-center gap-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        type="button"
        onClick={() => handleVote(1)}
        disabled={castVote.isPending}
        aria-label="Upvote"
        className={[
          'inline-flex h-7 w-8 items-center justify-center rounded-md border transition-colors',
          userVote === 1
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-background text-muted-foreground hover:bg-accent',
        ].join(' ')}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
      </button>

      <span className="min-w-[2rem] text-center text-sm font-semibold">
        {tally.score}
      </span>

      <button
        type="button"
        onClick={() => handleVote(-1)}
        disabled={castVote.isPending}
        aria-label="Downvote"
        className={[
          'inline-flex h-7 w-8 items-center justify-center rounded-md border transition-colors',
          userVote === -1
            ? 'border-destructive bg-destructive text-destructive-foreground'
            : 'border-border bg-background text-muted-foreground hover:bg-accent',
        ].join(' ')}
      >
        <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}