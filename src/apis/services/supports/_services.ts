import { supportEndpoints } from './_endpoints';
import { mapSupportDetailsDTO, mapSupportListItemDTO } from './_mappers';
import type {
  CreateSupportRequestDTO,
  SupportDetailsDTO,
  SupportListItemDTO,
  UpdateSupportRequestDTO,
} from './_dto';
import type { SupportServices, SupportsParams } from './_types';
import type {
  ApiRequestFunction,
  ApiPaginatedRequestFunction,
} from '@/apis/core/types/api-request.types';

export const createSupportServices = (
  apiRequest: ApiRequestFunction,
  apiPaginatedRequest: ApiPaginatedRequestFunction,
): SupportServices => {
  return {
    getSupports: async (params: SupportsParams, signal?: AbortSignal) => {
      const response = await apiPaginatedRequest<
        SupportListItemDTO,
        undefined
      >({
        url: supportEndpoints.getSupports,
        method: 'GET',
        params,
        signal,
        meta: {
          auth: 'required',
        },
      });

      return {
        ...response,
        items: response.items.map(mapSupportListItemDTO),
      };
    },
    getSupport: async (supportId: number, signal?: AbortSignal) => {
      const response = await apiRequest<SupportDetailsDTO, undefined>({
        url: supportEndpoints.getSupport(supportId),
        method: 'GET',
        signal,
        meta: {
          auth: 'required',
        },
      });

      return mapSupportDetailsDTO(response);
    },
    createSupport: async (
      payload: CreateSupportRequestDTO,
      signal?: AbortSignal,
    ) => {
      const response = await apiRequest<SupportDetailsDTO, CreateSupportRequestDTO>({
        url: supportEndpoints.createSupport,
        method: 'POST',
        data: payload,
        signal,
        meta: {
          auth: 'required',
        },
      });

      return mapSupportDetailsDTO(response);
    },
    updateSupport: async (
      supportId: number,
      payload: UpdateSupportRequestDTO,
      signal?: AbortSignal,
    ) => {
      const response = await apiRequest<SupportDetailsDTO, UpdateSupportRequestDTO>({
        url: supportEndpoints.updateSupport(supportId),
        method: 'PATCH',
        data: payload,
        signal,
        meta: {
          auth: 'required',
        },
      });

      return mapSupportDetailsDTO(response);
    },
  };
};
