import { ApiRequestFunction } from '@/apis/core/types/api-request.types';
import { LOOKUP_ENDPOINTS } from './_endpoints';
import { toDepartmentLookup, toSupportLookup } from './_mappers';
import type { DepartmentLookupDto, SupportLookupDto } from './_dto';
import type {
  GetDepartmentsResponse,
  GetSupportsRequest,
  GetSupportsResponse,
} from './_types';

export function createLookupServices(request: ApiRequestFunction) {
  async function getDepartments(
    signal?: AbortSignal,
  ): Promise<GetDepartmentsResponse> {
    const response = await request<DepartmentLookupDto[]>({
      url: LOOKUP_ENDPOINTS.departments,
      method: 'GET',
      signal,
      meta: {
        auth: 'required',
      },
    });

    return response.map(toDepartmentLookup);
  }

  async function getSupports(
    params?: GetSupportsRequest,
    signal?: AbortSignal,
  ): Promise<GetSupportsResponse> {
    const response = await request<SupportLookupDto[]>({
      url: LOOKUP_ENDPOINTS.supports,
      method: 'GET',
      params,
      signal,
      meta: {
        auth: 'required',
      },
    });

    return response.map(toSupportLookup);
  }

  return {
    getDepartments,
    getSupports,
  };
}
