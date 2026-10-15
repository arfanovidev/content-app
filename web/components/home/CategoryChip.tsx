'use client';

interface CategoryChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'snap-category inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'active:scale-95',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'border border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-accent hover:text-foreground',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
