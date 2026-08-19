import type { ApiRequestError } from '@/apis/core/api-error';
import type { PaginatedResult } from '@/apis/core/types/api-response';
import type { ISupportListItem } from '@/models';

export type SupportTableData = PaginatedResult<ISupportListItem>;

export type SupportsTableProps = {
  data: SupportTableData;
  error: ApiRequestError | null;
  isLoading: boolean;
  isPending: boolean;
  topContent?: React.ReactNode;
  onPageChange: (page: number) => void;
  onRetry: () => void;
};
