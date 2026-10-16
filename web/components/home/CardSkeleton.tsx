import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card p-3">
      <Skeleton className="aspect-square h-24 w-24 shrink-0 rounded-lg sm:h-28 sm:w-28" />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
        <Skeleton className="h-3 w-20 rounded" />
      </div>
    </div>
  );
}