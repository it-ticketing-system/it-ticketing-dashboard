'use client';

import { TableCell, TableRow, Skeleton } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { TableEmptyState, TableErrorState } from '@/components/shared';
import { TableContainer } from '@/containers';
import { formatPersianDateTime } from '@/utils';
import type { UsersTableProps } from './types';
import type { TableHeaderOptions } from '@/containers';
import type { IUserListItem } from '@/models';

type UserTableColumnKey = 'name' | 'username' | 'ticketCount' | 'createdAt';

const UserRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-32 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-12 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-28 rounded-sm" />
    </TableCell>
  </TableRow>
);

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
    },
    {
      id: 'username',
      label: t('columns.username'),
    },
    {
      id: 'ticketCount',
      label: t('columns.ticketCount'),
    },
    {
      id: 'createdAt',
      label: t('columns.createdAt'),
    },
  ];

  const renderCell = (user: IUserListItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return <span>{user.name}</span>;
      case 'username':
        return <span className="text-neutral-500">{user.username}</span>;
      case 'ticketCount':
        return <span>{user.ticketCount}</span>;
      case 'createdAt':
        return <span>{formatPersianDateTime(user.createdAt)}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {topContent}

      <TableContainer
        ariaLabel={t('ariaLabel')}
        headerCells={headerCells}
        items={isLoading ? Array.from({ length: 10 }).map((_, i) => ({ id: `skeleton-${i}` } as unknown as IUserListItem)) : data.items}
        errorComponent={
          error ? (
            <TableErrorState
              title={commonT('table.error.title')}
              errorMessage={commonT(error.messageKey)}
              retryLabel={commonT('table.error.retry')}
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
      >
        {(item) =>
          isLoading ? (
            <UserRowSkeleton />
          ) : (
            <TableRow key={item.id}>
              {headerCells.map((column) => (
                <TableCell key={column.id}>
                  {renderCell(item, column.id)}
                </TableCell>
              ))}
            </TableRow>
          )
        }
      </TableContainer>
    </div>
  );
};

export default UsersTable;
