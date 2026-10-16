'use client';

import { Play, Pause, Square } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

interface AudioPlayerProps {
  isPlaying: boolean;
  isPaused: boolean;
  supported: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function AudioPlayer({
  isPlaying,
  isPaused,
  supported,
  onPlay,
  onPause,
  onStop,
}: AudioPlayerProps) {
  const t = useMessages();

  if (!supported) {
    return (
      <div className="flex h-12 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-3 text-xs text-muted-foreground">
        {t.details?.audioNotSupported || 'Audio not supported'}
      </div>
    );
  }

  const handlePlayPause = () => {
    if (isPlaying) onPause();
    else onPlay();
  };

  const isIdle = !isPlaying && !isPaused;

  const statusLabel = isPlaying
    ? t.details?.audioPlaying || 'Playing'
    : isPaused
      ? t.details?.audioPaused || 'Paused'
      : t.details?.audioReady || 'Ready';

  return (
    <div className="flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-2">
      <button
        type="button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" strokeWidth={2.5} />
        ) : (
          <Play className="h-5 w-5" strokeWidth={2.5} />
        )}
      </button>

      <button
        type="button"
        onClick={onStop}
        disabled={isIdle}
        aria-label="Stop"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Square className="h-4 w-4" strokeWidth={2.5} />
      </button>

      <span className="ml-1 text-xs font-medium text-muted-foreground">
        {statusLabel}
      </span>
    </div>
  );
}