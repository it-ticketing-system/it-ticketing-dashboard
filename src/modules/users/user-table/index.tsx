'use client';

import { useTranslations } from 'next-intl';
import { TableEmptyState, TableErrorState } from '@/components/shared';
import { TableContainer } from '@/containers';
import { formatPersianDateTime } from '@/utils';
import type { UsersTableProps } from './types';
import type { TableHeaderOptions } from '@/containers';
import type { IUserListItem } from '@/models';

type UserTableColumnKey = 'name' | 'username' | 'ticketCount' | 'createdAt';

const UsersTable = ({
  data,
  error,
  isLoading,
  isPending,
  topContent,
  onPageChange,
  onRetry,
}: UsersTableProps) => {
  const t = useTranslations('users.table');
  const commonT = useTranslations('common');

  const headerCells: Array<TableHeaderOptions<UserTableColumnKey>> = [
    {
      id: 'name',
      label: t('columns.name'),
      isRowHeader: true,
      skeletonClassName: 'w-32',
    },
    {
      id: 'username',
      label: t('columns.username'),
      cellClassName: 'text-neutral-500',
      skeletonClassName: 'w-24',
    },
    {
      id: 'ticketCount',
      label: t('columns.ticketCount'),
      skeletonClassName: 'w-12',
    },
    {
      id: 'createdAt',
      label: t('columns.createdAt'),
      isNowrap: true,
      skeletonClassName: 'w-28',
    },
  ];

  const renderCell = (user: IUserListItem, columnKey: UserTableColumnKey) => {
    switch (columnKey) {
      case 'name':
        return user.name;
      case 'username':
        return user.username;
      case 'ticketCount':
        return user.ticketCount;
      case 'createdAt':
        return formatPersianDateTime(user.createdAt);
      default:
        return null;
    }
  };

  return (
    <TableContainer
      ariaLabel={t('ariaLabel')}
      headerCells={headerCells}
      topContent={topContent}
      items={data.items}
      isLoading={isLoading}
      errorComponent={
        error ? (
          <TableErrorState
            errorMessage={commonT(error.messageKey)}
            isRetrying={isPending}
            onRetry={onRetry}
          />
        ) : undefined
      }
      emptyComponent={<TableEmptyState title={t('emptyState')} />}
      pagination={{
        ...data.meta,
        isPending,
        onPageChange,
      }}
      renderCell={renderCell}
    />
  );
};

export default UsersTable;
