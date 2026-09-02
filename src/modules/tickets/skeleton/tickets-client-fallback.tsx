import { Skeleton } from '@heroui/react';

const TicketsClientFallback = () => {
  return (
    <div aria-hidden="true" className="space-y-4">
      <div className="flex items-center gap-3 lg:hidden">
        <Skeleton className="h-11 min-w-0 flex-1 rounded-md" />
        <Skeleton className="size-11 shrink-0 rounded-md" />
      </div>

      <div className="border-border bg-surface hidden rounded-xl border p-4 shadow-sm lg:block">
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_160px_160px_176px_112px]">
          <Skeleton className="h-11 rounded-md lg:col-span-2 xl:col-span-1" />
          <Skeleton className="h-11 rounded-md" />
          <Skeleton className="h-11 rounded-md" />
          <Skeleton className="h-11 rounded-md" />
          <Skeleton className="h-11 rounded-md" />
        </div>
      </div>

      <div className="border-border bg-surface hidden overflow-hidden rounded-xl border shadow-sm lg:block">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="border-separator grid h-16 grid-cols-[150px_minmax(260px,1fr)_180px_160px_190px_96px] items-center gap-4 border-b px-4 last:border-b-0"
          >
            <Skeleton className="h-4 rounded-sm" />
            <Skeleton className="h-5 rounded-sm" />
            <Skeleton className="h-4 rounded-sm" />
            <Skeleton className="h-6 rounded-full" />
            <Skeleton className="h-4 rounded-sm" />
            <Skeleton className="size-8 rounded-md" />
          </div>
        ))}
      </div>

      <div className="space-y-3 lg:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border-border bg-surface min-h-34 rounded-xl border p-4 shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-20 rounded-sm" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 rounded-sm" />
                <Skeleton className="h-4 w-28 rounded-sm" />
              </div>

              <div className="border-separator flex items-center justify-between border-t pt-3">
                <Skeleton className="h-4 w-24 rounded-sm" />
                <Skeleton className="h-4 w-16 rounded-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsClientFallback;
