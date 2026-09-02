import { Skeleton } from '@heroui/react';

const SupportManageClientFallback = () => {
  return (
    <div className="border-border bg-surface mx-auto rounded-xl border p-6 shadow-sm">
      <Skeleton className="mb-6 h-8 w-48 rounded-lg" />

      <div className="space-y-8">
        <div>
          <Skeleton className="mb-4 h-6 w-32 rounded-md" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>

        <div>
          <Skeleton className="mb-4 h-6 w-40 rounded-md" />
          <div className="mb-6">
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-24 rounded-md" />
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-48 rounded-md" />
              ))}
            </div>
          </div>
        </div>

        <div className="border-border flex justify-end gap-3 border-t pt-4">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SupportManageClientFallback;
