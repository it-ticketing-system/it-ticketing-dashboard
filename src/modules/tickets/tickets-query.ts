import { PAGE_SIZE } from '@/constants';
import {
  createEmptyPaginatedData,
  getSearchParamValue,
  toPositiveInteger,
} from '@/utils';
import { TicketTableData } from './ticket-table/types';
import type { TicketFiltersValue } from './ticket-filters/types';
import type { GetManagementTicketsRequest } from '@/apis/services/tickets/client';
import type { TicketStatus } from '@/models';

const TICKET_STATUS_VALUES = [
  'open',
  'inProgress',
  'waitingUser',
  'resolved',
  'closed',
] as const satisfies readonly TicketStatus[];

export const FILTER_QUERY_KEYS = [
  'search',
  'status',
  'department',
  'support',
  'user',
  'createdFrom',
  'createdTo',
  'page',
] as const;

const isTicketStatus = (value: string): value is TicketStatus => {
  return TICKET_STATUS_VALUES.includes(value as TicketStatus);
};

export const parseTicketFilters = (
  searchParams: PageSearchParams,
): TicketFiltersValue & { page: number } => {
  const status = getSearchParamValue(searchParams, 'status');

  return {
    search: getSearchParamValue(searchParams, 'search'),
    status: isTicketStatus(status) ? status : '',
    department: getSearchParamValue(searchParams, 'department'),
    support: getSearchParamValue(searchParams, 'support'),
    user: getSearchParamValue(searchParams, 'user'),
    createdFrom: getSearchParamValue(searchParams, 'createdFrom'),
    createdTo: getSearchParamValue(searchParams, 'createdTo'),
    page: toPositiveInteger(getSearchParamValue(searchParams, 'page')) ?? 1,
  };
};

export const createTicketsParams = (
  filters: TicketFiltersValue & { page: number },
): Required<Pick<GetManagementTicketsRequest, 'page' | 'perPage'>> &
  Omit<GetManagementTicketsRequest, 'page' | 'perPage'> => {
  const departmentId = toPositiveInteger(filters.department);
  const supportId = toPositiveInteger(filters.support);
  const userId = toPositiveInteger(filters.user);
  const status = isTicketStatus(filters.status) ? filters.status : undefined;

  return {
    page: filters.page,
    perPage: PAGE_SIZE,
    search: filters.search.trim() || undefined,
    status,
    departmentId,
    supportId,
    userId,
    createdFrom: filters.createdFrom || undefined,
    createdTo: filters.createdTo || undefined,
  };
};

export const createEmptyTickets = (page: number): TicketTableData =>
  createEmptyPaginatedData(page, PAGE_SIZE);

export const areTicketFiltersEqual = (
  first: TicketFiltersValue & { page: number },
  second: TicketFiltersValue & { page: number },
): boolean => {
  return (
    first.search === second.search &&
    first.status === second.status &&
    first.department === second.department &&
    first.support === second.support &&
    first.user === second.user &&
    first.createdFrom === second.createdFrom &&
    first.createdTo === second.createdTo &&
    first.page === second.page
  );
};
