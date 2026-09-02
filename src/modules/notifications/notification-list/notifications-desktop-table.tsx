'use client';

import { Button } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS } from '@/constants';
import { TableContainer } from '@/containers';
import NotificationIcon from '../notification-icon';
import {
  NotificationListEmptyState,
  NotificationListErrorState,
} from './table-states';
import type { NotificationListItem, NotificationListViewProps } from './types';
import type { TableHeaderOptions } from '@/containers';

type NotificationTableColumnKey =
  'status' | 'title' | 'body' | 'related' | 'time' | 'actions';

const NotificationsDesktopTable = ({
  items,
  meta,
  activeTab,
  error = null,
  isLoading = false,
  isPending = false,
  onClearFilters,
  onNotificationOpen,
  onPageChange,
  onRetry,
}: NotificationListViewProps) => {
  const t = useTranslations('notifications.list');

  const headerCells: Array<TableHeaderOptions<NotificationTableColumnKey>> = [
    {
      id: 'status',
      label: t('columns.status'),
      className: 'w-28',
      skeletonClassName: 'w-16',
    },
    {
      id: 'title',
      label: t('columns.title'),
      isRowHeader: true,
      className: 'w-[22%]',
      cellClassName: 'text-foreground truncate font-semibold',
      skeletonClassName: 'w-40',
    },
    {
      id: 'body',
      label: t('columns.body'),
      className: 'w-[34%]',
      cellClassName: 'text-muted truncate',
      skeletonClassName: 'w-full max-w-56',
    },
    {
      id: 'related',
      label: t('columns.related'),
      className: 'w-40',
      cellClassName: 'text-muted text-caption',
      skeletonClassName: 'w-20',
    },
    {
      id: 'time',
      label: t('columns.time'),
      className: 'w-44',
      cellClassName: 'text-muted',
      isNowrap: true,
      skeletonClassName: 'w-28',
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
    notification: NotificationListItem,
    columnKey: NotificationTableColumnKey,
  ) => {
    switch (columnKey) {
      case 'status':
        return (
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={
                notification.isRead
                  ? 'size-2 rounded-full bg-neutral-300'
                  : 'bg-accent size-2 rounded-full'
              }
            />
            <NotificationIcon
              type={notification.type}
              isRead={notification.isRead}
            />
          </div>
        );
      case 'title':
        return notification.title;
      case 'body':
        return notification.body;
      case 'related':
        return notification.relatedEntity?.ticketNumber ? (
          <span
            dir="ltr"
            className="font-latin bg-primary-50 text-accent inline-flex rounded-md px-2.5 py-1 text-xs font-medium"
          >
            #{notification.relatedEntity.ticketNumber.replace(/^#/, '')}
          </span>
        ) : (
          t('related.system')
        );
      case 'time':
        return (
          <>
            <span className="block">{notification.createdAtLabel}</span>
            <span className="text-caption mt-1 block">
              {notification.createdAtRelativeLabel}
            </span>
          </>
        );
      case 'actions':
        return (
          <Button
            isIconOnly
            size="sm"
            variant="outline"
            aria-label={t('actions.openAriaLabel', {
              title: notification.title,
            })}
            onPress={() => onNotificationOpen?.(notification)}
          >
            <ArrowLeft aria-hidden="true" className={ICON_SIZE_CLASS.md} />
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
      items={items}
      isLoading={isLoading}
      errorComponent={
        error ? (
          <NotificationListErrorState
            error={error}
            isRetrying={isPending}
            onRetry={onRetry}
          />
        ) : null
      }
      emptyComponent={
        <NotificationListEmptyState
          hasActiveFilter={activeTab !== 'all'}
          onClearFilters={onClearFilters}
        />
      }
      pagination={{
        ...meta,
        isPending,
        onPageChange,
      }}
      renderCell={renderCell}
    />
  );
};

export default NotificationsDesktopTable;
