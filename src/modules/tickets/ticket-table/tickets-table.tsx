'use client';

import { Button, Table } from '@heroui/react';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TicketStatusChip } from '@/components/shared';
import { ICON_SIZE_CLASS } from '@/constants';
import { TableContainer } from '@/containers';
import { TicketsTableEmptyState, TicketsTableErrorState } from './table-states';
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
        isLoading={isLoading}
        loadingLabel={t('loading')}
        items={data.items}
        errorComponent={
          error ? (
            <TicketsTableErrorState
              error={error}
              isRetrying={isPending}
              onRetry={onRetry}
            />
          ) : null
        }
        emptyComponent={<TicketsTableEmptyState />}
        pagination={{
          ...data.meta,
          isPending,
          onPageChange,
        }}
        paginationLabels={{
          previous: t('pagination.previous'),
          next: t('pagination.next'),
          page: (page) => t('pagination.page', { page }),
          summary: ({ from, to, total }) =>
            t('pagination.summary', { from, to, total }),
        }}
      >
        {(ticket) => (
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
                label={t(`statuses.${ticket.status}`)}
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
