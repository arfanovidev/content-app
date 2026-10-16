import { Skeleton } from '@/components/ui/skeleton';

export function FavoritesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex gap-3 p-3">
            <Skeleton className="aspect-square h-20 w-20 shrink-0 rounded-lg sm:h-24 sm:w-24" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          </div>
          <div className="border-t border-border px-3 py-2">
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}