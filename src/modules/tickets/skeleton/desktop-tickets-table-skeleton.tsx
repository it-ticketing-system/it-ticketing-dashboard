'use client';

import { Skeleton } from '@heroui/react';

const DESKTOP_FALLBACK_ROWS = 5;

const gridCols = 'grid-cols-[120px_minmax(180px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_120px_120px_120px_120px_80px]';

const DesktopTicketRowSkeleton = () => {
  return (
    <div className={`border-separator grid h-16 border-b ${gridCols}`}>
      <div className="flex items-center px-4">
        <Skeleton className="h-4 w-20 rounded-sm" />
      </div>

      <div className="flex items-center px-4">
        <Skeleton className="h-5 w-full max-w-40 rounded-sm" />
      </div>

      <div className="flex items-center px-4">
        <Skeleton className="h-4 w-24 rounded-sm" />
      </div>

      <div className="flex items-center px-4">
        <Skeleton className="h-4 w-24 rounded-sm" />
      </div>

      <div className="flex items-center px-4">
        <Skeleton className="h-4 w-20 rounded-sm" />
      </div>

      <div className="flex items-center px-4">
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className="flex items-center px-4">
        <Skeleton className="h-4 w-24 rounded-sm" />
      </div>

      <div className="flex items-center px-4">
        <Skeleton className="h-4 w-24 rounded-sm" />
      </div>

      <div className="flex items-center justify-center px-4">
        <Skeleton className="size-8 rounded-md" />
      </div>
    </div>
  );
};

export const DesktopTicketsTableSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="border-border bg-surface hidden overflow-hidden rounded-xl border shadow-sm lg:block"
    >
      <div className="overflow-x-hidden">
        <div dir="rtl" className="min-w-225">
          <div className={`border-separator grid h-14 border-b bg-neutral-50 ${gridCols}`}>
            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-20 rounded-sm" />
            </div>

            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-16 rounded-sm" />
            </div>

            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-16 rounded-sm" />
            </div>

            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-16 rounded-sm" />
            </div>

            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-20 rounded-sm" />
            </div>

            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-16 rounded-sm" />
            </div>

            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-20 rounded-sm" />
            </div>

            <div className="flex items-center px-4">
              <Skeleton className="h-4 w-20 rounded-sm" />
            </div>

            <div className="flex items-center justify-center px-4">
              <Skeleton className="h-4 w-12 rounded-sm" />
            </div>
          </div>

          {Array.from({ length: DESKTOP_FALLBACK_ROWS }).map((_, index) => (
            <DesktopTicketRowSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="bg-surface flex h-14 items-center justify-between px-4">
        <Skeleton className="h-4 w-40 rounded-sm" />

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="size-8 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};
