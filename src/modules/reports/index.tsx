import { Suspense } from 'react';
import { RoleGuard } from '@/components/shared';
import ReportsClient from './reports-client';
import ReportsClientFallback from './skeleton/reports-client-fallback';

type ReportsModuleProps = {
  searchParams: Promise<PageSearchParams>;
};

const ReportsModule = async ({ searchParams }: ReportsModuleProps) => {
  const initialSearchParams = await searchParams;

  return (
    <RoleGuard adminOnly>
      <Suspense fallback={<ReportsClientFallback />}>
        <ReportsClient initialSearchParams={initialSearchParams} />
      </Suspense>
    </RoleGuard>
  );
};

export default ReportsModule;
