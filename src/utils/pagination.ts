import { PAGE_SIZE } from '@/constants';
import type { PaginatedResult } from '@/apis/core/types/api-response';


export const createEmptyPaginatedData = <T>(
  page: number,
  perPage: number = PAGE_SIZE,
): PaginatedResult<T> => ({
  items: [],
  meta: {
    page,
    perPage,
    total: 0,
    totalPages: 0,
  },
});
