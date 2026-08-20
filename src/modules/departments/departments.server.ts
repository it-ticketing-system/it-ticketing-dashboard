import { toApiRequestError } from '@/apis/core/api-error';
import { serverDepartmentServices } from '@/apis/services/departments/server';
import {
  createEmptyDepartments,
  createDepartmentsParams,
  parseDepartmentsFilters,
} from './departments-query';

export async function getDepartmentsServer(searchParams: {
  search?: string;
  page?: string;
}) {
  const filters = parseDepartmentsFilters(searchParams);
  const apiParams = createDepartmentsParams(filters);

  try {
    const data = await serverDepartmentServices.getDepartments(apiParams);
    return { data, error: null, filters };
  } catch (error) {
    const apiError = toApiRequestError(error);
    return {
      data: createEmptyDepartments(apiParams.page || 1),
      error: apiError,
      filters,
    };
  }
}
