import { Skeleton } from '@heroui/react';

export const MobileNotificationCardSkeleton = () => {
  return (
    <div className="border-border bg-surface min-h-28 rounded-xl border p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Skeleton className="size-10 shrink-0 rounded-xl" />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-5 w-36 rounded-sm" />
            <Skeleton className="size-2 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 rounded-sm" />
            <Skeleton className="h-4 w-2/3 rounded-sm" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-20 rounded-sm" />
            <Skeleton className="h-4 w-16 rounded-sm" />
          </div>
        </div>
      </div>

      <Skeleton className="mt-3 h-9 rounded-md" />
    </div>
  );
};

export const MobileNotificationsListSkeleton = () => {
  return (
    <div aria-hidden="true" className="space-y-3 lg:hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <MobileNotificationCardSkeleton key={index} />
      ))}
    </div>
  );
};
