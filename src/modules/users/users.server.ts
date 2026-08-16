import 'server-only';

import { toApiRequestError, type ApiRequestError } from '@/apis/core/api-error';
import { serverUserServices } from '@/apis/services/users/server';
import { UserTableData } from './user-table/types';
import {
  createEmptyUsers,
  createUsersParams,
  parseUsersFilters,
  type UsersSearchParams,
} from './users-query';

type UsersInitialData = {
  initialFilters: ReturnType<typeof parseUsersFilters>;
  initialUsers: UserTableData;
  initialUsersError: ApiRequestError | null;
};

export const getUsersInitialData = async (
  searchParams: UsersSearchParams,
): Promise<UsersInitialData> => {
  const initialFilters = parseUsersFilters(searchParams);
  const usersParams = createUsersParams(initialFilters);

  const [usersResult] = await Promise.allSettled([
    serverUserServices.getUsers(usersParams),
  ]);
  const initialUsers: UserTableData =
    usersResult.status === 'fulfilled'
      ? usersResult.value
      : createEmptyUsers(initialFilters.page);
  const initialUsersError =
    usersResult.status === 'rejected'
      ? toApiRequestError(usersResult.reason)
      : null;

  return {
    initialFilters,
    initialUsers,
    initialUsersError,
  };
};
