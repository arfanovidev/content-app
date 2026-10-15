import { Skeleton } from '@/components/ui/skeleton';

export function DetailsSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Skeleton className="h-8 w-24 rounded-lg" />

        <div className="space-y-4">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-3/4 rounded-lg" />
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>

        <Skeleton className="aspect-video w-full rounded-xl" />

        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      </div>
    </div>
  );
}
