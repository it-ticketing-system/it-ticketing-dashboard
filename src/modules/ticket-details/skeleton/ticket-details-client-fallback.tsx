import { Skeleton } from '@heroui/react';

const TicketDetailsClientFallback = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden lg:flex-row lg:gap-6">
      <div className="order-2 flex min-h-0 flex-1 flex-col gap-4 overflow-hidden lg:order-1 lg:gap-6">
        {/* Ticket Info Card Skeleton */}
        <div className="border-border bg-surface flex flex-col rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-6 w-1/3 rounded-lg" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Ticket Conversation Skeleton */}
        <div className="border-border bg-surface flex flex-1 flex-col rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-6 w-1/4 rounded-lg" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-24 w-3/4 self-start rounded-xl" />
            <Skeleton className="h-24 w-3/4 self-end rounded-xl" />
            <Skeleton className="h-24 w-3/4 self-start rounded-xl" />
          </div>
          <div className="mt-4 border-border border-t pt-4">
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Operations Card Skeleton */}
      <div className="order-1 flex w-full shrink-0 flex-col items-end lg:order-2 lg:w-72">
        <div className="border-border bg-surface flex w-full flex-col rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-6 w-1/2 rounded-lg" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsClientFallback;
