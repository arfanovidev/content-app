'use client';

export function GravityAnimation() {
  return (
    <div className="relative h-10 w-10" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/40" />

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-1 w-1 rounded-full bg-foreground/30"
          style={{
            animation: `gravity-fall ${2.4 + i * 0.4}s ease-in infinite`,
            animationDelay: `${i * 0.3}s`,
            left: `${15 + i * 12}%`,
          }}
        />
      ))}
    </div>
  );
}