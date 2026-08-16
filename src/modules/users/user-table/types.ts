import { IUserListItem } from '@/models';
import type { ApiRequestError } from '@/apis/core/api-error';
import type { PaginatedResult } from '@/apis/core/types/api-response';

export type UserTableData = PaginatedResult<IUserListItem>;

export type UsersTableProps = {
  data: UserTableData;
  error?: ApiRequestError | null;
  topContent?: React.ReactNode;
  isLoading?: boolean;
  isPending?: boolean;
  onPageChange?: (page: number) => void;
  onRetry?: () => void;
};
