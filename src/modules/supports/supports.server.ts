import { toApiRequestError } from '@/apis/core/api-error';
import { serverSupportServices } from '@/apis/services/supports/server';
import {
  createEmptySupports,
  createSupportsParams,
  parseSupportsFilters,
} from './supports-query';

export async function getSupportsServer(searchParams: {
  search?: string;
  departmentId?: string;
  availabilityStatus?: string;
  page?: string;
}) {
  const filters = parseSupportsFilters(searchParams);
  const apiParams = createSupportsParams(filters);

  try {
    const data = await serverSupportServices.getSupports(apiParams);
    return { data, error: null, filters };
  } catch (error) {
    const apiError = toApiRequestError(error);
    return {
      data: createEmptySupports(apiParams.page),
      error: apiError,
      filters,
    };
  }
}
