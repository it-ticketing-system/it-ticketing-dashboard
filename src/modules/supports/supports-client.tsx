'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clientSupportServices } from '@/apis/services/supports/client';
import {
  FilterToolbar,
  SearchInput,
  SelectDepartment,
  SelectAvailability,
  ToolbarAddButton,
} from '@/components/shared';
import { ROUTES } from '@/constants';
import { useGetRequest, useQueryState } from '@/hooks';
import SupportsTable from './support-table';
import {
  areSupportsFiltersEqual,
  createEmptySupports,
  createSupportsParams,
  parseSupportsFilters,
  type SupportsFiltersValue,
} from './supports-query';
import type { SupportTableData } from './support-table/types';
import type { ApiRequestError } from '@/apis/core/api-error';

const SupportMobileFilters = dynamic(() => import('./support-mobile-filters'), {
  ssr: false,
});

type SupportsClientProps = {
  initialFilters: SupportsFiltersValue & { page: number };
  initialSupports: SupportTableData;
  initialSupportsError: ApiRequestError | null;
};

const SupportsClient = ({
  initialFilters,
  initialSupports,
  initialSupportsError,
}: SupportsClientProps) => {
  const router = useRouter();
  const t = useTranslations('supports.filters');
  const { getQuery, setQuery, updateQueries } = useQueryState();

  const filters = parseSupportsFilters({
    search: getQuery('search') ?? undefined,
    departmentId: getQuery('departmentId') ?? undefined,
    availabilityStatus: getQuery('availabilityStatus') ?? undefined,
    page: getQuery('page') ?? undefined,
  });

  const apiParams = createSupportsParams(filters);

  const supportsQuery = useGetRequest<SupportTableData>({
    queryKey: ['supports', apiParams],
    requestFn: (signal) => clientSupportServices.getSupports(apiParams, signal),
    initialData: () =>
      areSupportsFiltersEqual(filters, initialFilters)
        ? initialSupports
        : undefined,
    keepPreviousData: true,
  });

  const supportsError =
    supportsQuery.error ??
    (initialSupportsError &&
    areSupportsFiltersEqual(filters, initialFilters) &&
    !supportsQuery.isFetched
      ? initialSupportsError
      : null);

  const updateFilters = (
    patch: Partial<SupportsFiltersValue & { page: number }>,
  ) => {
    const nextSearch = patch.search;
    const hasSearchChange =
      nextSearch !== undefined && nextSearch !== filters.search;
    const nextDepartmentId = patch.departmentId;
    const hasDepartmentChange =
      nextDepartmentId !== undefined &&
      nextDepartmentId !== filters.departmentId;
    const nextAvailability = patch.availabilityStatus;
    const hasAvailabilityChange =
      nextAvailability !== undefined &&
      nextAvailability !== filters.availabilityStatus;

    if (
      !hasSearchChange &&
      !hasDepartmentChange &&
      !hasAvailabilityChange &&
      filters.page === 1
    ) {
      return;
    }

    const isFilterChange =
      patch.search !== undefined ||
      patch.departmentId !== undefined ||
      patch.availabilityStatus !== undefined;

    updateQueries(patch, {
      clear: isFilterChange ? ['page'] : [],
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

  const retry = () => {
    void supportsQuery.refetch();
  };

  return (
    <div className="flex flex-col gap-4">
      <FilterToolbar className="space-y-4">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="min-w-0 flex-1">
            <SearchInput
              label=""
              ariaLabel={t('searchAriaLabel')}
              placeholder={t('searchPlaceholder')}
              queryValue={filters.search || ''}
              onValueChange={(search) => updateFilters({ search })}
              className="h-11 min-w-0"
            />
          </div>

          <ToolbarAddButton
            label={t('addSupport')}
            onPress={() => router.push(ROUTES.supportAdd)}
          />

          <SupportMobileFilters
            filters={filters}
            onApplyFilters={updateFilters}
          />
        </div>

        <div className="hidden w-full items-end gap-4 lg:flex">
          <div className="min-w-0 flex-1">
            <SearchInput
              label=""
              ariaLabel={t('searchAriaLabel')}
              placeholder={t('searchPlaceholder')}
              queryValue={filters.search || ''}
              onValueChange={(search) => updateFilters({ search })}
              className="h-11 min-w-0"
            />
          </div>
          <div className="w-64">
            <SelectDepartment
              ariaLabel={t('departmentPlaceholder')}
              value={filters.departmentId ? String(filters.departmentId) : null}
              onChange={(departmentId) =>
                updateFilters({
                  departmentId: departmentId ? Number(departmentId) : undefined,
                })
              }
              placeholder={t('departmentPlaceholder')}
              emptyOptionLabel={t('allOption')}
            />
          </div>
          <div className="w-64">
            <SelectAvailability
              ariaLabel={t('availabilityPlaceholder')}
              value={filters.availabilityStatus || null}
              onChange={(availabilityStatus) =>
                updateFilters({
                  availabilityStatus: availabilityStatus ?? undefined,
                })
              }
              placeholder={t('availabilityPlaceholder')}
              emptyOptionLabel={t('allOption')}
            />
          </div>
          <ToolbarAddButton
            label={t('addSupport')}
            onPress={() => router.push(ROUTES.supportAdd)}
          />
        </div>
      </FilterToolbar>

      <SupportsTable
        data={supportsQuery.data || createEmptySupports(apiParams.page)}
        error={supportsError}
        isLoading={supportsQuery.isLoading}
        isPending={supportsQuery.isFetching}
        onPageChange={handlePageChange}
        onRetry={retry}
        topContent={null}
      />
    </div>
  );
};

export default SupportsClient;
