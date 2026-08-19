import type { PaginatedResult } from '@/apis/core/types/api-response';
import type { ISupportListItem, ISupportDetails } from '@/models';

export type SupportsParams = {
  search?: string;
  departmentId?: number;
  availabilityStatus?: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';
  page?: number;
  perPage?: number;
};

export type GetSupportsResponse = PaginatedResult<ISupportListItem>;
export type GetSupportDetailsResponse = ISupportDetails;

export type CreateSupportPayload = {
  name: string;
  username: string;
  password?: string;
  departmentIds: number[];
  availabilityStatus: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';
  permissions: string[];
};

export type UpdateSupportPayload = Partial<CreateSupportPayload>;

export interface SupportServices {
  getSupports: (
    params: SupportsParams,
    signal?: AbortSignal,
  ) => Promise<GetSupportsResponse>;
  getSupport: (
    supportId: number,
    signal?: AbortSignal,
  ) => Promise<GetSupportDetailsResponse>;
  createSupport: (
    payload: CreateSupportPayload,
    signal?: AbortSignal,
  ) => Promise<GetSupportDetailsResponse>;
  updateSupport: (
    supportId: number,
    payload: UpdateSupportPayload,
    signal?: AbortSignal,
  ) => Promise<GetSupportDetailsResponse>;
}
