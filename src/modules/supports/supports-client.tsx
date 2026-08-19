'use client';

import { Button } from '@heroui/react';
import { Plus, RotateCcw } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clientSupportServices } from '@/apis/services/supports/client';
import {
  SearchInput,
  SelectDepartment,
  SelectAvailability,
} from '@/components/shared';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';
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

const SupportMobileFilters = dynamic(
  () => import('./support-mobile-filters'),
  { ssr: false },
);

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

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.departmentId) ||
    Boolean(filters.availabilityStatus);

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

  const handleResetFilters = () => {
    updateQueries(
      {
        search: undefined,
        departmentId: undefined,
        availabilityStatus: undefined,
        page: undefined,
      },
      {
        clear: ['search', 'departmentId', 'availabilityStatus', 'page'],
        history: 'replace',
        scroll: false,
        strategy: 'native',
      },
    );
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
      <div className="border-border bg-surface flex flex-col gap-4 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="flex-1 flex gap-2 w-full">
          <SearchInput
            label=""
            ariaLabel={t('searchAriaLabel')}
            placeholder={t('searchPlaceholder')}
            queryValue={filters.search || ''}
            onValueChange={(search) => updateFilters({ search })}
            className="flex-1"
          />
          <Button
            onPress={() => router.push(ROUTES.supportAdd)}
            variant="primary"
            className="sm:hidden px-3 min-w-0"
            isIconOnly
            aria-label={t('addSupport')}
          >
            <Plus className={ICON_SIZE_CLASS.sm} />
          </Button>
        </div>
        
        <div className="sm:hidden">
          <SupportMobileFilters filters={filters} onApplyFilters={updateFilters} />
        </div>

        <div className="hidden sm:flex flex-row items-center gap-4 w-full sm:w-auto">
          <div className="w-64">
            <SelectDepartment
              ariaLabel={t('departmentPlaceholder')}
              value={
                filters.departmentId ? String(filters.departmentId) : null
              }
              onChange={(departmentId) =>
                updateFilters({
                  departmentId: departmentId
                    ? Number(departmentId)
                    : undefined,
                })
              }
              placeholder={t('departmentPlaceholder')}
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
            />
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onPress={handleResetFilters}
              className="border-field-border text-danger h-11 px-3"
              aria-label={t('reset')}
            >
              <RotateCcw aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
              <span className="hidden xl:inline">{t('reset')}</span>
            </Button>
          )}
          <Button
            onPress={() => router.push(ROUTES.supportAdd)}
            variant="primary"
          >
            <div className="flex items-center gap-2">
              <Plus className={ICON_SIZE_CLASS.sm} />
              <span>{t('addSupport')}</span>
            </div>
          </Button>
        </div>
      </div>

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
