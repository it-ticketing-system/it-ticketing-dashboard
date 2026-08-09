import { Skeleton } from '@heroui/react';
import { cn } from '@/utils';

export type SidebarSkeletonProps = {
  collapsed?: boolean;
};

export const SidebarSkeleton = ({ collapsed = false }: SidebarSkeletonProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col animate-pulse">
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-neutral-200/60',
          collapsed ? 'justify-center px-2' : 'px-4 gap-3',
        )}
      >
        <Skeleton className="size-10 rounded-lg shrink-0" />
        {!collapsed ? (
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          'min-h-0 flex-1 space-y-2 py-4',
          collapsed ? 'px-2' : 'px-3',
        )}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'flex h-10 items-center rounded-md',
              collapsed ? 'justify-center px-0' : 'gap-3 px-3',
            )}
          >
            <Skeleton className="size-5 rounded-md shrink-0" />
            {!collapsed ? (
              <Skeleton className="h-4 flex-1 rounded-md" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
