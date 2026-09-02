'use client';

import { TableCell, TableRow, Skeleton, Button } from '@heroui/react';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TableEmptyState, TableErrorState } from '@/components/shared';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';
import { TableContainer } from '@/containers';
import type { ApiRequestError } from '@/apis/core/api-error';
import type { PaginatedResult } from '@/apis/core/types/api-response';
import type { TableHeaderOptions } from '@/containers';
import type { IDepartmentListItem } from '@/models';

export type DepartmentsTableData = PaginatedResult<IDepartmentListItem>;

interface DepartmentsTableProps {
  data: DepartmentsTableData;
  error: ApiRequestError | null;
  isLoading: boolean;
  isPending: boolean;
  topContent?: React.ReactNode;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

type DepartmentTableColumnKey = 'name' | 'supportCount' | 'ticketCount' | 'actions';

const DepartmentRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-32 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-12 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-12 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-8 w-8 rounded-md" />
    </TableCell>
  </TableRow>
);

export const DepartmentsTable = ({
  data,
  error,
  isLoading,
  isPending,
  topContent,
  onPageChange,
  onRetry,
}: DepartmentsTableProps) => {
  const router = useRouter();
  const t = useTranslations('departments.table');
  const tRoot = useTranslations('departments');
  const commonT = useTranslations('common');

  const headerCells: Array<TableHeaderOptions<DepartmentTableColumnKey>> = [
    { id: 'name', label: t('name'), isRowHeader: true },
    { id: 'supportCount', label: t('supportCount') },
    { id: 'ticketCount', label: t('ticketCount') },
    { id: 'actions', label: t('actions') },
  ];

  const renderCell = (department: IDepartmentListItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return <span className="font-medium">{department.name}</span>;
      case 'supportCount':
        return <span className="text-neutral-700">{department.supportCount}</span>;
      case 'ticketCount':
        return <span className="text-neutral-700">{department.ticketCount}</span>;
      case 'actions':
        return (
          <Button
            onPress={() => router.push(ROUTES.departmentDetails(department.id))}
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label="Edit department"
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
        ariaLabel={t('name')}
        headerCells={headerCells}
        items={
          isLoading
            ? Array.from({ length: 10 }).map(
                (_, i) => ({ id: `skeleton-${i}` } as unknown as IDepartmentListItem),
              )
            : data.items
        }
        errorComponent={
          error ? (
            <TableErrorState
              title={commonT('table.error.title')}
              errorMessage={commonT(error.messageKey as Parameters<typeof commonT>[0])}
              retryLabel={commonT('table.error.retry')}
              isRetrying={isPending}
              onRetry={onRetry}
            />
          ) : undefined
        }
        emptyComponent={<TableEmptyState title={tRoot('emptyState')} />}
        pagination={{
          ...data.meta,
          isPending,
          onPageChange,
        }}
      >
        {(item: IDepartmentListItem) =>
          isLoading ? (
            <DepartmentRowSkeleton />
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
