import { createEmptyPaginatedData } from '@/utils';
import type { SupportTableData } from './support-table/types';
import type { SupportsParams } from '@/apis/services/supports/_types';
import type { AvailabilityStatus } from '@/components/shared';

export type SupportsSearchParams = Record<string, string | string[] | undefined>;

export type SupportsFiltersValue = {
  search?: string;
  departmentId?: number;
  availabilityStatus?: AvailabilityStatus;
};

export const parseSupportsFilters = (
  raw: Partial<{ search: string; departmentId: string; availabilityStatus: string; page: string }>,
): SupportsFiltersValue & { page: number } => {
  return {
    search: raw.search || undefined,
    departmentId: raw.departmentId ? Number(raw.departmentId) : undefined,
    availabilityStatus: raw.availabilityStatus as AvailabilityStatus || undefined,
    page: raw.page ? Number(raw.page) : 1,
  };
};

export const createSupportsParams = (
  filters: SupportsFiltersValue & { page: number },
): SupportsParams => {
  return {
    search: filters.search,
    departmentId: filters.departmentId,
    availabilityStatus: filters.availabilityStatus,
    page: filters.page,
    perPage: 10,
  };
};

export const areSupportsFiltersEqual = (
  a: SupportsFiltersValue & { page: number },
  b: SupportsFiltersValue & { page: number },
) => {
  return (
    a.search === b.search &&
    a.departmentId === b.departmentId &&
    a.availabilityStatus === b.availabilityStatus &&
    a.page === b.page
  );
};

export const createEmptySupports = (page: number = 1): SupportTableData => 
  createEmptyPaginatedData(page, 10);
