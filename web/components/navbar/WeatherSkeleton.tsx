import { Skeleton } from '@/components/ui/skeleton';

export function WeatherSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-4 w-12 rounded" />
    </div>
  );
}