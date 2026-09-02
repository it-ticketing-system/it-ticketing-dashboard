import { Skeleton } from '@heroui/react';

export const DesktopNotificationsTableSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="border-border bg-surface hidden overflow-hidden rounded-xl border shadow-sm lg:block"
    >
      <div className="border-separator grid h-12 grid-cols-[112px_minmax(180px,1fr)_minmax(260px,1.4fr)_160px_176px_80px] items-center gap-4 border-b bg-neutral-50 px-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-4 rounded-sm" />
        ))}
      </div>

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border-separator grid min-h-18 grid-cols-[112px_minmax(180px,1fr)_minmax(260px,1.4fr)_160px_176px_80px] items-center gap-4 border-b px-4 last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="size-10 rounded-xl" />
          </div>
          <Skeleton className="h-5 rounded-sm" />
          <Skeleton className="h-4 rounded-sm" />
          <Skeleton className="h-7 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 rounded-sm" />
            <Skeleton className="h-3 w-20 rounded-sm" />
          </div>
          <Skeleton className="mx-auto size-8 rounded-md" />
        </div>
      ))}
    </div>
  );
};
