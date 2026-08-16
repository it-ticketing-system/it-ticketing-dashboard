import { UsersParams } from '@/apis/services/users/_types';
import { PAGE_SIZE } from '@/constants';
import {
  createEmptyPaginatedData,
  getSearchParamValue,
  toPositiveInteger,
} from '@/utils';
import { UserTableData } from './user-table/types';

export const FILTER_QUERY_KEYS = ['search', 'page'] as const;

export type UsersSearchParams = Record<string, string | string[] | undefined>;

export type UsersFiltersValue = {
  search: string;
};

export const parseUsersFilters = (
  searchParams: UsersSearchParams,
): UsersFiltersValue & { page: number } => {
  return {
    search: getSearchParamValue(searchParams, 'search'),
    page: toPositiveInteger(getSearchParamValue(searchParams, 'page')) ?? 1,
  };
};

export const createUsersParams = (
  filters: UsersFiltersValue & { page: number },
): Required<Pick<UsersParams, 'page' | 'perPage'>> &
  Omit<UsersParams, 'page' | 'perPage'> => {
  return {
    page: filters.page,
    perPage: PAGE_SIZE,
    search: filters.search.trim() || undefined,
  };
};

export const createEmptyUsers = (page: number): UserTableData =>
  createEmptyPaginatedData(page, PAGE_SIZE);

export const areUsersFiltersEqual = (
  first: UsersFiltersValue & { page: number },
  second: UsersFiltersValue & { page: number },
): boolean => {
  return first.search === second.search && first.page === second.page;
};
