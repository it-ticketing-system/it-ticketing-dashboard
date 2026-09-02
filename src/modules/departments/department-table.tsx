'use client';

import { Button } from '@heroui/react';
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

type DepartmentTableColumnKey =
  'name' | 'supportCount' | 'ticketCount' | 'actions';

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
    {
      id: 'name',
      label: t('name'),
      isRowHeader: true,
      cellClassName: 'font-medium',
      skeletonClassName: 'w-32',
    },
    {
      id: 'supportCount',
      label: t('supportCount'),
      cellClassName: 'text-neutral-700',
      skeletonClassName: 'w-12',
    },
    {
      id: 'ticketCount',
      label: t('ticketCount'),
      cellClassName: 'text-neutral-700',
      skeletonClassName: 'w-12',
    },
    {
      id: 'actions',
      label: t('actions'),
      skeletonClassName: 'h-8 w-8 rounded-md',
    },
  ];

  const renderCell = (
    department: IDepartmentListItem,
    columnKey: DepartmentTableColumnKey,
  ) => {
    switch (columnKey) {
      case 'name':
        return department.name;
      case 'supportCount':
        return department.supportCount;
      case 'ticketCount':
        return department.ticketCount;
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
    <TableContainer
      ariaLabel={t('name')}
      headerCells={headerCells}
      topContent={topContent}
      items={data.items}
      isLoading={isLoading}
      errorComponent={
        error ? (
          <TableErrorState
            errorMessage={commonT(
              error.messageKey as Parameters<typeof commonT>[0],
            )}
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
      renderCell={renderCell}
    />
  );
};
