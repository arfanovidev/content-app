import { Skeleton } from '@/components/ui/skeleton';

export function FavoritesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border/60 bg-card"
        >
          <div className="space-y-3 p-4 sm:p-5">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-3 w-1/2 rounded-md" />
          </div>
          <div className="border-t border-border/60 px-4 py-3">
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}