import { ApiRequestFunction, ApiPaginatedRequestFunction } from '@/apis/core/types/api-request.types';
import { DEPARTMENT_ENDPOINTS } from './_endpoints';
import { toDepartmentListItem, toDepartmentDetails } from './_mappers';
import type { DepartmentListItemDto, DepartmentDetailsDto } from './_dto';
import type {
  GetDepartmentsRequest,
  GetDepartmentsResponse,
  CreateDepartmentRequest,
  CreateDepartmentResult,
  UpdateDepartmentRequest,
  UpdateDepartmentResult,
} from './_types';

export function createDepartmentServices(
  request: ApiRequestFunction,
  paginatedRequest: ApiPaginatedRequestFunction,
) {
  async function getDepartments(
    params?: GetDepartmentsRequest,
    signal?: AbortSignal,
  ): Promise<GetDepartmentsResponse> {
    const response = await paginatedRequest<DepartmentListItemDto, undefined>({
      url: DEPARTMENT_ENDPOINTS.list,
      method: 'GET',
      params,
      signal,
      meta: {
        auth: 'required',
      },
    });

    return {
      ...response,
      items: response.items.map(toDepartmentListItem),
    };
  }

  async function createDepartment(
    data: CreateDepartmentRequest,
    signal?: AbortSignal,
  ): Promise<CreateDepartmentResult> {
    const response = await request<DepartmentDetailsDto>({
      url: DEPARTMENT_ENDPOINTS.create,
      method: 'POST',
      data,
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toDepartmentDetails(response);
  }

  async function updateDepartment(
    data: UpdateDepartmentRequest,
    signal?: AbortSignal,
  ): Promise<UpdateDepartmentResult> {
    const response = await request<DepartmentDetailsDto>({
      url: DEPARTMENT_ENDPOINTS.update(data.id),
      method: 'PATCH',
      data: {
        name: data.name,
        supportIds: data.supportIds,
      },
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toDepartmentDetails(response);
  }

  return {
    getDepartments,
    createDepartment,
    updateDepartment,
  };
}
