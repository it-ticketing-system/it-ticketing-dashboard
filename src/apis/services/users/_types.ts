import type { PaginatedResult } from '@/apis/core/types/api-response';
import type { IUserListItem } from '@/models';

export type UsersParams = {
  search?: string;
  page?: number;
  perPage?: number;
};

export type GetUsersResponse = PaginatedResult<IUserListItem>;

export interface UserServices {
  getUsers: (
    params: UsersParams,
    signal?: AbortSignal,
  ) => Promise<GetUsersResponse>;
}
