import { connection } from 'next/server';
import { Suspense } from 'react';
import { RoleGuard } from '@/components/shared';
import SupportsClientFallback from './skeleton/supports-client-fallback';
import SupportsClient from './supports-client';
import { getSupportsServer } from './supports.server';

type SupportsModuleProps = {
  searchParams: Promise<PageSearchParams>;
};

const SupportsModule = async ({ searchParams }: SupportsModuleProps) => {
  await connection();
  const resolvedSearchParams = await searchParams;
  const { data, error, filters } = await getSupportsServer(resolvedSearchParams);

  return (
    <RoleGuard adminOnly>
      <Suspense fallback={<SupportsClientFallback />}>
        <SupportsClient
          initialFilters={filters}
          initialSupports={data}
          initialSupportsError={error}
        />
      </Suspense>
    </RoleGuard>
  );
};

export default SupportsModule;
