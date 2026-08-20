import { PaginationMeta } from '@/apis/core/types/api-response';
import { GetDepartmentsRequest } from '@/apis/services/departments';
import { IDepartmentListItem } from '@/models';

export type DepartmentsFiltersValue = {
  search?: string;
};

export const parseDepartmentsFilters = (
  raw: Partial<Record<keyof DepartmentsFiltersValue, string | null | undefined>> & {
    page?: string | null | number;
  },
): DepartmentsFiltersValue & { page: number } => {
  return {
    search: raw.search || undefined,
    page: raw.page ? Number(raw.page) : 1,
  };
};

export const createDepartmentsParams = (
  filters: DepartmentsFiltersValue & { page: number },
): GetDepartmentsRequest => {
  return {
    search: filters.search,
    page: filters.page,
    perPage: 10,
  };
};

export const areDepartmentsFiltersEqual = (
  a: DepartmentsFiltersValue & { page: number },
  b: DepartmentsFiltersValue & { page: number },
) => {
  return a.search === b.search && a.page === b.page;
};

export const createEmptyDepartments = (page: number) => ({
  items: [] as IDepartmentListItem[],
  meta: {
    page,
    perPage: 10,
    total: 0,
    totalPages: 0,
  } as PaginationMeta,
});
