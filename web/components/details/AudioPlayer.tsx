'use client';

import { Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  if (!supported) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
        Audio not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
      {isPlaying ? (
        <Button
          type="button"
          size="icon"
          onClick={onPause}
          aria-label="Pause"
          className="rounded-lg"
        >
          <Pause className="h-5 w-5" strokeWidth={2.5} />
        </Button>
      ) : (
        <Button
          type="button"
          size="icon"
          onClick={isPaused ? onPlay : onPlay}
          aria-label="Play"
          className="rounded-lg"
        >
          <Play className="h-5 w-5" strokeWidth={2.5} />
        </Button>
      )}

      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={onStop}
        disabled={!isPlaying && !isPaused}
        aria-label="Stop"
        className="rounded-lg"
      >
        <Square className="h-4 w-4" strokeWidth={2.5} />
      </Button>

      <span className="ml-2 text-sm font-medium text-muted-foreground">
        {isPlaying ? 'Playing...' : isPaused ? 'Paused' : 'Listen'}
      </span>
    </div>
  );
}