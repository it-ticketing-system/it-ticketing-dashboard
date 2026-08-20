import { Skeleton } from '@heroui/react';

const DepartmentManageClientFallback = () => {
  return (
    <div className="border-border bg-surface mx-auto rounded-xl border p-6 shadow-sm">
      <Skeleton className="mb-6 h-8 w-48 rounded-md" />

      <div className="space-y-8">
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>

        <div className="border-border flex justify-end gap-3 border-t pt-4">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default DepartmentManageClientFallback;
