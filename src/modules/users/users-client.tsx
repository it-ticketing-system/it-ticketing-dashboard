'use client';

import { useTranslations } from 'next-intl';
import { clientUserServices } from '@/apis/services/users/client';
import { SearchInput } from '@/components/shared';
import { useGetRequest, useQueryState } from '@/hooks';
import UsersTable from './user-table';
import {
  areUsersFiltersEqual,
  createEmptyUsers,
  createUsersParams,
  parseUsersFilters,
  type UsersFiltersValue,
} from './users-query';
import type { UserTableData } from './user-table/types';
import type { ApiRequestError } from '@/apis/core/api-error';

type UsersClientProps = {
  initialFilters: UsersFiltersValue & { page: number };
  initialUsers: UserTableData;
  initialUsersError: ApiRequestError | null;
};

const UsersClient = ({
  initialFilters,
  initialUsers,
  initialUsersError,
}: UsersClientProps) => {
  const t = useTranslations('users.filters');
  const { getQuery, setQuery, updateQueries } = useQueryState();

  const filters = parseUsersFilters({
    search: getQuery('search') ?? undefined,
    page: getQuery('page') ?? undefined,
  });

  const apiParams = createUsersParams(filters);

  const usersQuery = useGetRequest<UserTableData>({
    queryKey: ['users', apiParams],
    requestFn: (signal) => clientUserServices.getUsers(apiParams, signal),
    initialData: () =>
      areUsersFiltersEqual(filters, initialFilters) ? initialUsers : undefined,
    keepPreviousData: true,
  });

  const usersError =
    usersQuery.error ??
    (initialUsersError &&
    areUsersFiltersEqual(filters, initialFilters) &&
    !usersQuery.isFetched
      ? initialUsersError
      : null);

  const updateFilters = (
    patch: Partial<UsersFiltersValue & { page: number }>,
  ) => {
    const nextSearch = patch.search;
    const hasChange = nextSearch !== undefined && nextSearch !== filters.search;

    if (!hasChange && filters.page === 1) {
      return;
    }

    updateQueries(patch, {
      clear: patch.search !== undefined ? ['page'] : [],
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
    void usersQuery.refetch();
  };

  return (
    <div className="flex flex-col gap-6">
      <UsersTable
        data={usersQuery.data || createEmptyUsers(apiParams.page)}
        error={usersError}
        isLoading={usersQuery.isLoading}
        isPending={usersQuery.isFetching}
        onPageChange={handlePageChange}
        onRetry={retry}
        topContent={
          <div className="border-border bg-surface rounded-xl border p-4 shadow-sm">
            <SearchInput
              label=""
              ariaLabel={t('searchAriaLabel')}
              placeholder={t('searchPlaceholder')}
              queryValue={filters.search || ''}
              onValueChange={(search) => updateFilters({ search })}
            />
          </div>
        }
      />
    </div>
  );
};

export default UsersClient;
