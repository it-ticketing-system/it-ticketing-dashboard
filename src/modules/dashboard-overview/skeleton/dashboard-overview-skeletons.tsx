import { Card, CardContent, Skeleton, Spinner } from '@heroui/react';

export const MetricsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="border-neutral-200/80 shadow-xs">
          <CardContent className="flex min-h-36 flex-col justify-between gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-36 rounded-md" />
              </div>
              <Skeleton className="size-11 shrink-0 rounded-xl" />
            </div>
            <Skeleton className="h-9 w-20 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const TrendSkeleton = () => {
  return (
    <div className="flex h-72 min-h-72 w-full items-center justify-center rounded-xl bg-neutral-50 md:h-80 md:min-h-80">
      <Spinner color="accent" />
    </div>
  );
};

const DashboardOverviewClientFallback = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-9 w-56 rounded-md" />
        <Skeleton className="h-4 w-full max-w-2xl rounded-md" />
      </div>
      <MetricsSkeleton />
      <Card className="border-neutral-200/80 shadow-xs">
        <CardContent>
          <TrendSkeleton />
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardOverviewClientFallback;
