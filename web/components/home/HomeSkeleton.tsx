import { Skeleton } from '@/components/ui/skeleton';

export function HomeSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="border-b border-border bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <Skeleton className="h-7 w-40 rounded-full" />
              <Skeleton className="h-14 w-full max-w-md rounded-lg" />
              <Skeleton className="h-14 w-3/4 rounded-lg" />
              <Skeleton className="h-5 w-full max-w-lg rounded" />
              <div className="flex gap-3">
                <Skeleton className="h-11 w-32 rounded-full" />
                <Skeleton className="h-11 w-32 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="aspect-[3/4] rounded-2xl" />
              <Skeleton className="mt-8 aspect-[3/4] rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-7 w-20 shrink-0 rounded-full" />
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex gap-3 rounded-2xl border border-border bg-card p-3"
            >
              <Skeleton className="aspect-square h-24 w-24 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}