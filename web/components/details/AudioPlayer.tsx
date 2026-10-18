'use client';

import { Play, Pause, Square, AlertCircle } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

interface AudioPlayerProps {
  isPlaying: boolean;
  isPaused: boolean;
  supported: boolean;
  error?: string | null;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function AudioPlayer({
  isPlaying,
  isPaused,
  supported,
  error,
  onPlay,
  onPause,
  onStop,
}: AudioPlayerProps) {
  const t = useMessages();

  if (!supported) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>
          {t.details?.audioNotSupported ||
            'Audio not supported in this browser'}
        </span>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (isPlaying) onPause();
    else onPlay();
  };

  const isIdle = !isPlaying && !isPaused;

  const statusLabel = error
    ? error
    : isPlaying
      ? t.details?.audioPlaying || 'Playing'
      : isPaused
        ? t.details?.audioPaused || 'Paused'
        : t.details?.audioReady || 'Ready';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex h-14 items-center gap-2 rounded-lg border border-border bg-card px-3">
        <button
          type="button"
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            minHeight: '44px',
            minWidth: '44px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
          className="flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          style={{
            minHeight: '44px',
            minWidth: '44px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
          className="flex shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95 disabled:opacity-40"
        >
          <Square className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <span
          className={`ml-1 text-xs font-medium ${
            error ? 'text-destructive' : 'text-muted-foreground'
          }`}
        >
          {statusLabel}
        </span>
      </div>
    </div>
  );
}