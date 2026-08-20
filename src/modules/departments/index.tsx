import { connection } from 'next/server';
import { Suspense } from 'react';
import { RoleGuard } from '@/components/shared';
import { DepartmentsClient } from './departments-client';
import { getDepartmentsServer } from './departments.server';
import DepartmentsClientFallback from './skeleton/departments-client-fallback';

type DepartmentsModuleProps = {
  searchParams: Promise<PageSearchParams>;
};

const DepartmentsModule = async ({ searchParams }: DepartmentsModuleProps) => {
  await connection();
  const resolvedSearchParams = await searchParams;
  const { data, error, filters } = await getDepartmentsServer(
    resolvedSearchParams as { search?: string; page?: string },
  );

  return (
    <RoleGuard adminOnly>
      <Suspense fallback={<DepartmentsClientFallback />}>
        <DepartmentsClient
          initialFilters={filters}
          initialDepartments={data}
          initialDepartmentsError={error}
        />
      </Suspense>
    </RoleGuard>
  );
};

export default DepartmentsModule;
