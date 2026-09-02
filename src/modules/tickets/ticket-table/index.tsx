'use client';

import { Button } from '@heroui/react';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  TicketStatusChip,
  TableEmptyState,
  TableErrorState,
} from '@/components/shared';
import { ICON_SIZE_CLASS } from '@/constants';
import { TableContainer } from '@/containers';
import type { TicketTableItem, TicketsTableProps } from './types';
import type { TableHeaderOptions } from '@/containers';

type TicketTableColumnKey =
  | 'ticketNumber'
  | 'title'
  | 'user'
  | 'assignedSupport'
  | 'department'
  | 'status'
  | 'createdAt'
  | 'lastUpdated'
  | 'actions';

const TicketsTable = ({
  data,
  error = null,
  topContent,
  isLoading = false,
  isPending = false,
  onPageChange,
  onRetry,
}: TicketsTableProps) => {
  const t = useTranslations('tickets.table');
  const commonT = useTranslations('common');
  const tStatuses = useTranslations('common.statuses');
  const router = useRouter();

  const headerCells: Array<TableHeaderOptions<TicketTableColumnKey>> = [
    {
      id: 'ticketNumber',
      label: t('columns.ticketNumber'),
      isRowHeader: true,
      className: 'w-[120px]',
      cellClassName: 'font-latin text-foreground font-medium',
      cellDir: 'ltr',
      isNowrap: true,
      skeletonClassName: 'w-20',
    },
    {
      id: 'title',
      label: t('columns.title'),
      className: 'w-[20%]',
      cellClassName: 'text-foreground truncate font-medium',
      skeletonClassName: 'h-5 w-full max-w-40',
    },
    {
      id: 'user',
      label: t('columns.user'),
      className: 'w-[15%]',
      cellClassName: 'text-muted truncate',
      skeletonClassName: 'w-24',
    },
    {
      id: 'assignedSupport',
      label: t('columns.assignedSupport'),
      className: 'w-[15%]',
      cellClassName: 'text-muted truncate',
      skeletonClassName: 'w-24',
    },
    {
      id: 'department',
      label: t('columns.department'),
      className: 'w-[120px]',
      cellClassName: 'text-muted truncate',
      skeletonClassName: 'w-20',
    },
    {
      id: 'status',
      label: t('columns.status'),
      className: 'w-[120px]',
      skeletonClassName: 'h-6 w-16 rounded-full',
    },
    {
      id: 'createdAt',
      label: t('columns.createdAt'),
      className: 'w-[120px]',
      cellClassName: 'text-muted',
      isNowrap: true,
      skeletonClassName: 'w-24',
    },
    {
      id: 'lastUpdated',
      label: t('columns.lastUpdated'),
      className: 'w-[120px]',
      cellClassName: 'text-muted',
      isNowrap: true,
      skeletonClassName: 'w-24',
    },
    {
      id: 'actions',
      label: t('columns.actions'),
      className: 'w-20 text-center',
      cellClassName: 'text-center',
      skeletonClassName: 'mx-auto size-8 rounded-md',
    },
  ];

  const renderCell = (
    ticket: TicketTableItem,
    columnKey: TicketTableColumnKey,
  ) => {
    switch (columnKey) {
      case 'ticketNumber':
        return ticket.ticketNumber;
      case 'title':
        return ticket.title;
      case 'user':
        return ticket.user.name;
      case 'assignedSupport':
        return ticket.assignedSupport ? ticket.assignedSupport.name : '-';
      case 'department':
        return ticket.departmentName;
      case 'status':
        return (
          <TicketStatusChip
            status={ticket.status}
            label={tStatuses(ticket.status)}
          />
        );
      case 'createdAt':
        return ticket.createdAtLabel;
      case 'lastUpdated':
        return ticket.lastUpdatedLabel;
      case 'actions':
        return (
          <Button
            isIconOnly
            size="sm"
            variant="outline"
            aria-label={t('actions.viewAriaLabel', {
              number: ticket.ticketNumber,
            })}
            onPress={() => router.push(ticket.detailsHref)}
          >
            <Eye aria-hidden="true" className={ICON_SIZE_CLASS.md} />
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
        ) : null
      }
      emptyComponent={
        <TableEmptyState
          title={t('empty.title')}
          description={t('empty.description')}
        />
      }
      pagination={{
        ...data.meta,
        isPending,
        onPageChange,
      }}
      renderCell={renderCell}
    />
  );
};

export default TicketsTable;
