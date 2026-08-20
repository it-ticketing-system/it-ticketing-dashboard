import { PaginatedResult } from '@/apis/core/types/api-response';
import { IDepartmentListItem, IDepartmentDetails } from '@/models';

export interface GetDepartmentsRequest {
  search?: string;
  page?: number;
  perPage?: number;
}

export type GetDepartmentsResponse = PaginatedResult<IDepartmentListItem>;

export interface CreateDepartmentRequest {
  name: string;
  supportIds: number[];
}

export type CreateDepartmentResult = IDepartmentDetails;

export interface UpdateDepartmentRequest {
  id: number;
  name: string;
  supportIds: number[];
}

export type UpdateDepartmentResult = IDepartmentDetails;
