'use client';

import { Button } from '@heroui/react';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  TableEmptyState,
  TableErrorState,
  SupportStatusChip,
} from '@/components/shared';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';
import { TableContainer } from '@/containers';
import { formatPersianDateTime } from '@/utils';
import type { SupportsTableProps } from './types';
import type { TableHeaderOptions } from '@/containers';
import type { ISupportListItem } from '@/models';

type SupportTableColumnKey =
  | 'name'
  | 'username'
  | 'departments'
  | 'availabilityStatus'
  | 'activeTicketCount'
  | 'lastActivityAt'
  | 'actions';

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
    {
      id: 'name',
      label: t('columns.name'),
      isRowHeader: true,
      cellClassName: 'font-medium',
      skeletonClassName: 'w-32',
    },
    {
      id: 'username',
      label: t('columns.username'),
      cellClassName: 'text-neutral-500',
      skeletonClassName: 'w-24',
    },
    {
      id: 'departments',
      label: t('columns.departments'),
      cellClassName: 'text-neutral-700',
      skeletonClassName: 'w-40',
    },
    {
      id: 'availabilityStatus',
      label: t('columns.availabilityStatus'),
      skeletonClassName: 'h-6 w-16 rounded-full',
    },
    {
      id: 'activeTicketCount',
      label: t('columns.activeTicketCount'),
      skeletonClassName: 'w-12',
    },
    {
      id: 'lastActivityAt',
      label: t('columns.lastActivityAt'),
      isNowrap: true,
      skeletonClassName: 'w-28',
    },
    {
      id: 'actions',
      label: t('columns.actions'),
      skeletonClassName: 'h-8 w-8 rounded-md',
    },
  ];

  const renderCell = (
    support: ISupportListItem,
    columnKey: SupportTableColumnKey,
  ) => {
    switch (columnKey) {
      case 'name':
        return support.name;
      case 'username':
        return support.username;
      case 'departments':
        return support.departments.map((d) => d.name).join('، ');
      case 'availabilityStatus':
        return (
          <SupportStatusChip
            status={support.availabilityStatus}
            label={statusT(support.availabilityStatus || 'default')}
          />
        );
      case 'activeTicketCount':
        return support.activeTicketCount;
      case 'lastActivityAt':
        return support.lastActivityAt
          ? formatPersianDateTime(support.lastActivityAt)
          : '-';
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

export default SupportsTable;
