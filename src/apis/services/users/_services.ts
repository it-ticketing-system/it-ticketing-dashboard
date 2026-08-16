import { USERS_ENDPOINTS } from './_endpoints';
import { mapUserResponseToModel } from './_mappers';
import type { UsersRequestDto, UserResponseDto } from './_dto';
import type { UserServices, UsersParams, GetUsersResponse } from './_types';
import type { ApiPaginatedRequestFunction } from '@/apis/core/types/api-request.types';

export function createUserServices(
  paginatedRequest: ApiPaginatedRequestFunction,
): UserServices {
  async function getUsers(
    params: UsersParams,
    signal?: AbortSignal,
  ): Promise<GetUsersResponse> {
    const response = await paginatedRequest<UserResponseDto, UsersRequestDto>({
      url: USERS_ENDPOINTS.list,
      method: 'GET',
      params: {
        search: params.search,
        page: params.page,
        perPage: params.perPage,
      },
      signal,
      meta: {
        auth: 'required',
      },
    });

    return {
      items: response.items.map(mapUserResponseToModel),
      meta: response.meta,
    };
  }

  return {
    getUsers,
  };
}
