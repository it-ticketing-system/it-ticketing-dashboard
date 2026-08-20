'use client';

import { Button } from '@heroui/react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clientDepartmentServices } from '@/apis/services/departments/client';
import { SearchInput } from '@/components/shared';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';
import { useGetRequest, useQueryState } from '@/hooks';
import { DepartmentsTable, type DepartmentsTableData } from './department-table';
import {
  areDepartmentsFiltersEqual,
  createEmptyDepartments,
  createDepartmentsParams,
  parseDepartmentsFilters,
  type DepartmentsFiltersValue,
} from './departments-query';
import type { ApiRequestError } from '@/apis/core/api-error';

type DepartmentsClientProps = {
  initialFilters: DepartmentsFiltersValue & { page: number };
  initialDepartments: DepartmentsTableData;
  initialDepartmentsError: ApiRequestError | null;
};

export const DepartmentsClient = ({
  initialFilters,
  initialDepartments,
  initialDepartmentsError,
}: DepartmentsClientProps) => {
  const t = useTranslations('departments');
  const router = useRouter();
  const { getQuery, setQuery, updateQueries } = useQueryState();

  const filters = parseDepartmentsFilters({
    search: getQuery('search') ?? undefined,
    page: getQuery('page') ?? undefined,
  });

  const apiParams = createDepartmentsParams(filters);

  const departmentsQuery = useGetRequest<DepartmentsTableData>({
    queryKey: ['departments', apiParams],
    requestFn: (signal) => clientDepartmentServices.getDepartments(apiParams, signal),
    initialData: () =>
      areDepartmentsFiltersEqual(filters, initialFilters)
        ? initialDepartments
        : undefined,
    keepPreviousData: true,
  });

  const departmentsError =
    departmentsQuery.error ??
    (initialDepartmentsError &&
    areDepartmentsFiltersEqual(filters, initialFilters) &&
    !departmentsQuery.isFetched
      ? initialDepartmentsError
      : null);

  const updateFilters = (patch: Partial<DepartmentsFiltersValue & { page: number }>) => {
    const nextSearch = patch.search;
    const hasSearchChange = nextSearch !== undefined && nextSearch !== filters.search;

    if (!hasSearchChange && filters.page === 1) return;

    updateQueries(patch, {
      clear: hasSearchChange ? ['page'] : [],
      history: 'replace',
      scroll: false,
      strategy: 'native',
    });
  };

  const handlePageChange = (nextPage: number) => {
    setQuery('page', nextPage === 1 ? null : nextPage, {
      history: 'push',
      scroll: false,
      strategy: 'native',
    });
  };

  const retry = () => void departmentsQuery.refetch();

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border bg-surface flex flex-col gap-4 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center justify-between">
        <div className="flex-1 flex gap-2 w-full max-w-md">
          <SearchInput
            label=""
            ariaLabel={t('searchAriaLabel')}
            placeholder={t('searchPlaceholder')}
            queryValue={filters.search || ''}
            onValueChange={(search) => updateFilters({ search })}
            className="flex-1"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            onPress={() => router.push(ROUTES.departmentAdd)}
            variant="primary"
          >
            <div className="flex items-center gap-2">
              <Plus className={ICON_SIZE_CLASS.sm} />
              <span>{t('addDepartment')}</span>
            </div>
          </Button>
        </div>
      </div>

      <DepartmentsTable
        data={departmentsQuery.data || createEmptyDepartments(apiParams.page || 1)}
        error={departmentsError}
        isLoading={departmentsQuery.isLoading}
        isPending={departmentsQuery.isFetching}
        onPageChange={handlePageChange}
        onRetry={retry}
      />
    </div>
  );
};
