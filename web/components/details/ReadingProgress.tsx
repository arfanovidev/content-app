'use client';

interface ReadingProgressProps {
  progress: number;
}

export function ReadingProgress({ progress }: ReadingProgressProps) {
  const percent = Math.round(progress * 100);

  return (
    <div className="space-y-1.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {percent}% read
      </p>
    </div>
  );
}