import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="space-y-2.5 p-4 sm:p-5">
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-3.5 w-full rounded-md" />
        <Skeleton className="h-3.5 w-2/3 rounded-md" />
        <Skeleton className="h-3 w-1/3 rounded-md" />
      </div>
    </div>
  );
}
