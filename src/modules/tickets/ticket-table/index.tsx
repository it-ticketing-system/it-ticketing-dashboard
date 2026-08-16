'use client';

import { Button, Table, Skeleton } from '@heroui/react';
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
import type { TicketsTableProps } from './types';
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

const TicketRowSkeleton = () => (
  <Table.Row>
    <Table.Cell><Skeleton className="h-4 w-20 rounded-sm" /></Table.Cell>
    <Table.Cell><Skeleton className="h-5 w-full max-w-40 rounded-sm" /></Table.Cell>
    <Table.Cell><Skeleton className="h-4 w-24 rounded-sm" /></Table.Cell>
    <Table.Cell><Skeleton className="h-4 w-24 rounded-sm" /></Table.Cell>
    <Table.Cell><Skeleton className="h-4 w-20 rounded-sm" /></Table.Cell>
    <Table.Cell><Skeleton className="h-6 w-16 rounded-full" /></Table.Cell>
    <Table.Cell><Skeleton className="h-4 w-24 rounded-sm" /></Table.Cell>
    <Table.Cell><Skeleton className="h-4 w-24 rounded-sm" /></Table.Cell>
    <Table.Cell>
      <div className="flex justify-center">
        <Skeleton className="size-8 rounded-md" />
      </div>
    </Table.Cell>
  </Table.Row>
);

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
    },
    {
      id: 'title',
      label: t('columns.title'),
      className: 'w-[20%]',
    },
    {
      id: 'user',
      label: t('columns.user'),
      className: 'w-[15%]',
    },
    {
      id: 'assignedSupport',
      label: t('columns.assignedSupport'),
      className: 'w-[15%]',
    },
    {
      id: 'department',
      label: t('columns.department'),
      className: 'w-[120px]',
    },
    {
      id: 'status',
      label: t('columns.status'),
      className: 'w-[120px]',
    },
    {
      id: 'createdAt',
      label: t('columns.createdAt'),
      className: 'w-[120px]',
    },
    {
      id: 'lastUpdated',
      label: t('columns.lastUpdated'),
      className: 'w-[120px]',
    },
    {
      id: 'actions',
      label: t('columns.actions'),
      className: 'w-20 text-center',
    },
  ];

  return (
    <section className="space-y-4">
      {topContent}
      <TableContainer
        ariaLabel={t('ariaLabel')}
        headerCells={headerCells}
        items={isLoading ? Array.from({ length: 5 }).map((_, i) => ({ id: `skeleton-${i}` } as unknown as import('@/models').ITicket)) : data.items}
        errorComponent={
          error ? (
            <TableErrorState
              title={commonT('table.error.title')}
              errorMessage={commonT(error.messageKey)}
              retryLabel={commonT('table.error.retry')}
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
      >
        {(ticket) => isLoading ? (
          <TicketRowSkeleton />
        ) : (
          <Table.Row id={ticket.id}>
            <Table.Cell>
              <span
                dir="ltr"
                className="font-latin text-foreground inline-block font-medium whitespace-nowrap"
              >
                {ticket.ticketNumber}
              </span>
            </Table.Cell>

            <Table.Cell>
              <span
                className="text-foreground block truncate font-medium"
                title={ticket.title}
              >
                {ticket.title}
              </span>
            </Table.Cell>

            <Table.Cell className="text-muted">
              <span className="block truncate" title={ticket.user.name}>
                {ticket.user.name}
              </span>
            </Table.Cell>

            <Table.Cell className="text-muted">
              <span
                className="block truncate"
                title={ticket.assignedSupport?.name}
              >
                {ticket.assignedSupport ? ticket.assignedSupport.name : '-'}
              </span>
            </Table.Cell>

            <Table.Cell className="text-muted">
              <span className="block truncate">{ticket.departmentName}</span>
            </Table.Cell>

            <Table.Cell>
              <TicketStatusChip
                status={ticket.status}
                label={tStatuses(ticket.status)}
              />
            </Table.Cell>

            <Table.Cell className="text-muted">
              <span className="whitespace-nowrap">{ticket.createdAtLabel}</span>
            </Table.Cell>

            <Table.Cell className="text-muted">
              <span className="whitespace-nowrap">
                {ticket.lastUpdatedLabel}
              </span>
            </Table.Cell>

            <Table.Cell className="text-center">
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
            </Table.Cell>
          </Table.Row>
        )}
      </TableContainer>
    </section>
  );
};

export default TicketsTable;
