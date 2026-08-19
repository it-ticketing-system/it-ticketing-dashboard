import { Skeleton } from '@heroui/react';

const SupportsClientFallback = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Filters Skeleton */}
      <div className="bg-surface border-border flex w-full flex-col gap-4 rounded-xl border p-4 shadow-sm md:flex-row md:items-center">
        <Skeleton className="h-10 w-full rounded-lg md:flex-1" />
        <Skeleton className="h-10 w-full rounded-lg md:w-48" />
        <Skeleton className="h-10 w-full rounded-lg md:w-48" />
        <Skeleton className="h-10 w-full rounded-lg md:w-32" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-surface border-border flex w-full flex-col rounded-xl border shadow-sm">
        {/* Table Header */}
        <div className="border-border flex h-14 items-center gap-4 border-b px-4">
          <Skeleton className="h-4 w-32 rounded-sm" />
          <Skeleton className="h-4 w-24 rounded-sm" />
          <Skeleton className="h-4 w-40 rounded-sm" />
          <Skeleton className="h-4 w-16 rounded-sm" />
          <Skeleton className="h-4 w-12 rounded-sm" />
          <Skeleton className="h-4 w-28 rounded-sm" />
          <Skeleton className="h-4 w-8 rounded-sm" />
        </div>
        {/* Table Rows */}
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex h-12 items-center gap-4">
              <Skeleton className="h-4 w-32 rounded-sm" />
              <Skeleton className="h-4 w-24 rounded-sm" />
              <Skeleton className="h-4 w-40 rounded-sm" />
              <Skeleton className="h-4 w-16 rounded-sm" />
              <Skeleton className="h-4 w-12 rounded-sm" />
              <Skeleton className="h-4 w-28 rounded-sm" />
              <Skeleton className="h-4 w-8 rounded-sm" />
            </div>
          ))}
        </div>
        {/* Table Footer */}
        <div className="border-border flex h-14 items-center justify-between border-t px-4">
          <Skeleton className="h-4 w-24 rounded-sm" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-8 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportsClientFallback;
