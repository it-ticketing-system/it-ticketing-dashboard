import { Card, CardContent, Skeleton, Spinner } from '@heroui/react';

const ReportsClientFallback = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-9 w-48 rounded-md" />
        <Skeleton className="h-4 w-full max-w-2xl rounded-md" />
      </div>

      <Card className="border-neutral-200/80 shadow-xs">
        <CardContent className="grid gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-11 rounded-md" />
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-neutral-200/80 shadow-xs">
            <CardContent className="min-h-32">
              <Skeleton className="mb-4 h-4 w-28 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-neutral-200/80 shadow-xs">
        <CardContent className="flex h-72 items-center justify-center">
          <Spinner color="accent" />
        </CardContent>
      </Card>
    </section>
  );
};

export default ReportsClientFallback;
