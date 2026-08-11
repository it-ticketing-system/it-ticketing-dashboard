'use client';

import { clientLookupServices } from '@/apis/services/lookups/client';
import { clientTicketServices } from '@/apis/services/tickets/client';
import { QUERY_KEYS } from '@/constants';
import { useGetRequest, useQueryState } from '@/hooks';
import { getPatchValue } from '@/utils';
import MyTicketsFilters from './ticket-filters';
import {
  type TicketFiltersPatch,
  type TicketFiltersValue,
} from './ticket-filters/types';
import { TicketsTable, type TicketTableData } from './ticket-table';
import {
  areTicketFiltersEqual,
  createTicketsParams,
  FILTER_QUERY_KEYS,
  parseTicketFilters,
} from './tickets-query';
import type { ApiRequestError } from '@/apis/core/api-error';
import type { IDepartmentLookup } from '@/models';

type TicketsClientProps = {
  initialDepartments: IDepartmentLookup[];
  initialFilters: TicketFiltersValue & { page: number };
  initialTickets: TicketTableData;
  initialTicketsError: ApiRequestError | null;
};

const TicketsClient = ({
  initialDepartments,
  initialFilters,
  initialTickets,
  initialTicketsError,
}: TicketsClientProps) => {
  const { getQuery, setQuery, updateQueries, removeQueries } = useQueryState();

  const filters = parseTicketFilters({
    search: getQuery('search') ?? undefined,
    status: getQuery('status') ?? undefined,
    department: getQuery('department') ?? undefined,
    support: getQuery('support') ?? undefined,
    user: getQuery('user') ?? undefined,
    createdFrom: getQuery('createdFrom') ?? undefined,
    createdTo: getQuery('createdTo') ?? undefined,
    updatedFrom: getQuery('updatedFrom') ?? undefined,
    updatedTo: getQuery('updatedTo') ?? undefined,
    page: getQuery('page') ?? undefined,
  });

  const ticketsParams = createTicketsParams(filters);

  const departmentsQuery = useGetRequest({
    queryKey: QUERY_KEYS.lookups.departments,
    requestFn: async (signal) => clientLookupServices.getDepartments(signal),
    initialData: initialDepartments,
    showErrorToast: false,
    staleTime: 5 * 60_000,
  });

  const ticketsQuery = useGetRequest({
    queryKey: QUERY_KEYS.tickets.list(ticketsParams),
    requestFn: async (signal) =>
      clientTicketServices.getTickets(ticketsParams, signal),
    initialData: () =>
      areTicketFiltersEqual(filters, initialFilters)
        ? initialTickets
        : undefined,
    keepPreviousData: true,
    showErrorToast: false,
    staleTime: 30_000,
  });

  const ticketsError =
    ticketsQuery.error ??
    (initialTicketsError &&
    areTicketFiltersEqual(filters, initialFilters) &&
    !ticketsQuery.isFetched
      ? initialTicketsError
      : null);

  const filterValue: TicketFiltersValue = {
    search: filters.search,
    status: filters.status,
    department: filters.department,
    support: filters.support,
    user: filters.user,
    createdFrom: filters.createdFrom,
    createdTo: filters.createdTo,
    updatedFrom: filters.updatedFrom,
    updatedTo: filters.updatedTo,
  };

  const changeFilters = (patch: TicketFiltersPatch) => {
    const nextSearch = getPatchValue(patch, 'search');
    const nextStatus = getPatchValue(patch, 'status');
    const nextDepartment = getPatchValue(patch, 'department');
    const nextSupport = getPatchValue(patch, 'support');
    const nextUser = getPatchValue(patch, 'user');
    const nextCreatedFrom = getPatchValue(patch, 'createdFrom');
    const nextCreatedTo = getPatchValue(patch, 'createdTo');
    const nextUpdatedFrom = getPatchValue(patch, 'updatedFrom');
    const nextUpdatedTo = getPatchValue(patch, 'updatedTo');
    const hasChange =
      (nextSearch !== undefined && nextSearch !== filters.search) ||
      (nextStatus !== undefined && nextStatus !== filters.status) ||
      (nextDepartment !== undefined && nextDepartment !== filters.department) ||
      (nextSupport !== undefined && nextSupport !== filters.support) ||
      (nextUser !== undefined && nextUser !== filters.user) ||
      (nextCreatedFrom !== undefined &&
        nextCreatedFrom !== filters.createdFrom) ||
      (nextCreatedTo !== undefined && nextCreatedTo !== filters.createdTo) ||
      (nextUpdatedFrom !== undefined &&
        nextUpdatedFrom !== filters.updatedFrom) ||
      (nextUpdatedTo !== undefined && nextUpdatedTo !== filters.updatedTo);

    if (!hasChange && filters.page === 1) {
      return;
    }

    updateQueries(patch, {
      clear: ['page'],
      history: 'replace',
      scroll: false,
      strategy: 'native',
    });
  };

  const resetFilters = () => {
    if (
      !filters.search &&
      !filters.status &&
      !filters.department &&
      !filters.support &&
      !filters.user &&
      !filters.createdFrom &&
      !filters.createdTo &&
      !filters.updatedFrom &&
      !filters.updatedTo &&
      filters.page === 1
    ) {
      return;
    }

    removeQueries(FILTER_QUERY_KEYS, {
      history: 'replace',
      scroll: false,
      strategy: 'native',
    });
  };

  const changePage = (nextPage: number) => {
    setQuery('page', nextPage === 1 ? null : nextPage, {
      history: 'push',
      scroll: false,
      strategy: 'native',
    });
  };

  const retry = () => {
    void ticketsQuery.refetch();
  };

  return (
    <TicketsTable
      data={ticketsQuery.data ?? initialTickets}
      error={ticketsError}
      isLoading={ticketsQuery.isLoading}
      isPending={ticketsQuery.isFetching}
      onPageChange={changePage}
      onRetry={retry}
      topContent={
        <MyTicketsFilters
          departments={departmentsQuery.data ?? []}
          value={filterValue}
          isPending={ticketsQuery.isFetching || departmentsQuery.isFetching}
          onChange={changeFilters}
          onReset={resetFilters}
        />
      }
    />
  );
};

export default TicketsClient;
