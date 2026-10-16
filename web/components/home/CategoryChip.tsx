'use client';

interface CategoryChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  dataId?: string;
}

export function CategoryChip({
  label,
  active,
  onClick,
  dataId,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      data-cat-id={dataId}
      onClick={onClick}
      className={[
        'inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground',
      ].join(' ')}
    >
      {label}
    </button>
  );
}