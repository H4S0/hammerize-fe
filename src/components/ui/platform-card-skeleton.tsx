import { Skeleton } from '@/components/ui/skeleton';

export function PlatformCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
