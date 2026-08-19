'use client';

import { TableCell, TableRow, Skeleton, Button } from '@heroui/react';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TableEmptyState, TableErrorState, SupportStatusChip } from '@/components/shared';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';
import { TableContainer } from '@/containers';
import { formatPersianDateTime } from '@/utils';
import type { SupportsTableProps } from './types';
import type { TableHeaderOptions } from '@/containers';
import type { ISupportListItem } from '@/models';

type SupportTableColumnKey = 'name' | 'username' | 'departments' | 'availabilityStatus' | 'activeTicketCount' | 'lastActivityAt' | 'actions';

const SupportRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-32 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-40 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-6 w-16 rounded-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-12 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-28 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-8 w-8 rounded-md" />
    </TableCell>
  </TableRow>
);

const SupportsTable = ({
  data,
  error,
  isLoading,
  isPending,
  topContent,
  onPageChange,
  onRetry,
}: SupportsTableProps) => {
  const router = useRouter();
  const t = useTranslations('supports.table');
  const commonT = useTranslations('common');
  const statusT = useTranslations('supports.status');

  const headerCells: Array<TableHeaderOptions<SupportTableColumnKey>> = [
    { id: 'name', label: t('columns.name'), isRowHeader: true },
    { id: 'username', label: t('columns.username') },
    { id: 'departments', label: t('columns.departments') },
    { id: 'availabilityStatus', label: t('columns.availabilityStatus') },
    { id: 'activeTicketCount', label: t('columns.activeTicketCount') },
    { id: 'lastActivityAt', label: t('columns.lastActivityAt') },
    { id: 'actions', label: t('columns.actions') },
  ];

  const renderCell = (support: ISupportListItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return <span className="font-medium">{support.name}</span>;
      case 'username':
        return <span className="text-neutral-500">{support.username}</span>;
      case 'departments':
        return (
          <span className="text-neutral-700">
            {support.departments.map((d) => d.name).join('، ')}
          </span>
        );
      case 'availabilityStatus':
        return (
          <SupportStatusChip
            status={support.availabilityStatus}
            label={statusT(support.availabilityStatus || 'default')}
          />
        );
      case 'activeTicketCount':
        return <span>{support.activeTicketCount}</span>;
      case 'lastActivityAt':
        return <span>{support.lastActivityAt ? formatPersianDateTime(support.lastActivityAt) : '-'}</span>;
      case 'actions':
        return (
          <Button
            onPress={() => router.push(ROUTES.supportDetails(support.id))}
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label="Edit support"
          >
            <Pencil className={ICON_SIZE_CLASS.sm} />
          </Button>
        );
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
        items={
          isLoading
            ? Array.from({ length: 5 }).map(
                (_, i) => ({ id: `skeleton-${i}` } as unknown as ISupportListItem),
              )
            : data.items
        }
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
            <SupportRowSkeleton />
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

export default SupportsTable;
