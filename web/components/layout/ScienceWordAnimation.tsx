'use client';

export function ScienceWordAnimation() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center" aria-hidden>
      <div
        className="absolute inset-0 rounded-full border border-foreground/30"
        style={{
          animation: 'sci-spin 8s linear infinite',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
        }}
      />

      <div
        className="absolute inset-1.5 rounded-full border border-foreground/40"
        style={{
          animation: 'sci-spin 6s linear infinite reverse',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        }}
      />

      <div className="relative h-1.5 w-1.5 rounded-full bg-foreground/70" />

      <div
        className="absolute inset-0"
        style={{ animation: 'sci-spin 3s linear infinite' }}
      >
        <div className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground/60" />
      </div>
    </div>
  );
}