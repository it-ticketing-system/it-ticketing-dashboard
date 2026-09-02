'use client';

import { Pagination, Table } from '@heroui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, type ReactNode } from 'react';
import { ICON_SIZE_CLASS } from '@/constants';
import { useQueryState } from '@/hooks';
import type { PaginationMeta } from '@/apis/core/types/api-response';

type TableKey = string | number;

export interface TableHeaderOptions<TColumnKey extends TableKey = TableKey> {
  id: TColumnKey;
  label: ReactNode;
  className?: string;
  isRowHeader?: boolean;
}

interface TablePaginationOptions extends PaginationMeta {
  pageParam?: string;
  isPending?: boolean;
  onPageChange?: (page: number) => void;
}

interface TableContainerProps<
  TItem extends { id: TableKey },
  TColumnKey extends TableKey = TableKey,
> {
  ariaLabel: string;
  headerCells: Array<TableHeaderOptions<TColumnKey>>;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  pagination?: TablePaginationOptions;
  paginationFallback?: ReactNode;
  items: TItem[];
  children: (item: TItem) => ReactNode;
}

type PaginationToken = number | 'start-ellipsis' | 'end-ellipsis';

const createPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationToken[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'end-ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'start-ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'start-ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'end-ellipsis',
    totalPages,
  ];
};

const TablePaginationFallback = () => {
  return (
    <div
      aria-hidden="true"
      className="flex w-full items-center justify-between"
    >
      <div className="bg-primary-50 h-4 w-40 rounded-sm" />

      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="bg-primary-50 size-8 rounded-md" />
        ))}
      </div>
    </div>
  );
};

const TablePagination = ({
  page,
  totalPages,
  pageParam = 'page',
  isPending = false,
  onPageChange,
}: TablePaginationOptions) => {
  const { isPending: isNavigationPending, setQuery } = useQueryState();
  const t = useTranslations('common.pagination');

  const safeTotalPages = Math.max(totalPages, 1);
  const safePage = Math.min(Math.max(page, 1), safeTotalPages);
  const isPageChangePending = isPending || isNavigationPending;

  const paginationItems = createPaginationItems(safePage, safeTotalPages);

  const changePage = (nextPage: number) => {
    if (
      isPageChangePending ||
      nextPage < 1 ||
      nextPage > safeTotalPages ||
      nextPage === safePage
    ) {
      return;
    }

    if (onPageChange) {
      onPageChange(nextPage);
      return;
    }

    setQuery(pageParam, nextPage === 1 ? null : nextPage, {
      history: 'push',
      scroll: false,
    });
  };

  return (
    <Pagination size="sm">
      <Pagination.Summary>
        {t('summary', { page: safePage, totalPages: safeTotalPages })}
      </Pagination.Summary>

      {safeTotalPages > 1 && (
        <Pagination.Content dir="rtl">
          <Pagination.Item>
            <Pagination.Previous
              aria-label={t('previous')}
              isDisabled={isPageChangePending || safePage === 1}
              onPress={() => changePage(safePage - 1)}
            >
              <ChevronRight aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
            </Pagination.Previous>
          </Pagination.Item>

          {paginationItems.map((item) => {
            if (typeof item !== 'number') {
              return (
                <Pagination.Item key={item}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              );
            }

            return (
              <Pagination.Item key={item}>
                <Pagination.Link
                  aria-label={t('page', { page: item })}
                  isActive={item === safePage}
                  isDisabled={isPageChangePending}
                  onPress={() => changePage(item)}
                >
                  {item}
                </Pagination.Link>
              </Pagination.Item>
            );
          })}

          <Pagination.Item>
            <Pagination.Next
              aria-label={t('next')}
              isDisabled={isPageChangePending || safePage === safeTotalPages}
              onPress={() => changePage(safePage + 1)}
            >
              <ChevronLeft aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      )}
    </Pagination>
  );
};

const TableContainer = <
  TItem extends { id: TableKey },
  TColumnKey extends TableKey = TableKey,
>({
  ariaLabel,
  headerCells,
  errorComponent,
  emptyComponent,
  pagination,
  paginationFallback = <TablePaginationFallback />,
  items,
  children,
}: TableContainerProps<TItem, TColumnKey>) => {
  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content dir="rtl" aria-label={ariaLabel}>
          <Table.Header>
            {headerCells.map((cell) => (
              <Table.Column
                key={cell.id}
                id={cell.id}
                isRowHeader={cell.isRowHeader}
                className={cell.className}
              >
                {cell.label}
              </Table.Column>
            ))}
          </Table.Header>

          <Table.Body
            items={items}
            renderEmptyState={() => {
              if (errorComponent) {
                return errorComponent;
              }

              return emptyComponent ?? null;
            }}
          >
            {children}
          </Table.Body>
        </Table.Content>
        </Table.ScrollContainer>

      {pagination && pagination.total > 0 && (
        <Table.Footer>
          <Suspense fallback={paginationFallback}>
            <TablePagination {...pagination} />
          </Suspense>
        </Table.Footer>
      )}
    </Table>
  );
};

export default TableContainer;
export { TableContainer, TablePagination, TablePaginationFallback };
