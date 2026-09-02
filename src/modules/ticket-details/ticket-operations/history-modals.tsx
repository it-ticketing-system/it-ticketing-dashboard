'use client';

import { Skeleton } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { clientTicketServices } from '@/apis/services/tickets/client';
import { TicketStatusChip } from '@/components/shared';
import { PModal } from '@/components/ui';
import { QUERY_KEYS } from '@/constants';
import { useGetRequest } from '@/hooks';

interface HistoryModalsProps {
  ticketId: string;
  activeHistory: 'status' | 'department' | 'assignment' | null;
  onClose: () => void;
}

const HistoryModals = ({
  ticketId,
  activeHistory,
  onClose,
}: HistoryModalsProps) => {
  const t = useTranslations('ticketDetails.historyModals');
  const tStatuses = useTranslations('common.statuses');

  const { data: statusHistory, isLoading: isLoadingStatus } = useGetRequest({
    queryKey: QUERY_KEYS.tickets.statusHistory(ticketId),
    requestFn: () => clientTicketServices.getStatusHistory(ticketId),
    enabled: activeHistory === 'status',
  });

  const { data: departmentHistory, isLoading: isLoadingDepartment } =
    useGetRequest({
      queryKey: QUERY_KEYS.tickets.departmentHistory(ticketId),
      requestFn: () => clientTicketServices.getDepartmentHistory(ticketId),
      enabled: activeHistory === 'department',
    });

  const { data: assignmentHistory, isLoading: isLoadingAssignment } =
    useGetRequest({
      queryKey: QUERY_KEYS.tickets.assignmentHistory(ticketId),
      requestFn: () => clientTicketServices.getAssignmentHistory(ticketId),
      enabled: activeHistory === 'assignment',
    });

  const HistorySkeleton = () => (
    <div className="flex flex-col gap-4 py-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="border-border flex flex-col gap-2 rounded-lg border p-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-sm" />
            <Skeleton className="h-4 w-20 rounded-sm" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (activeHistory === 'status') {
      if (isLoadingStatus) return <HistorySkeleton />;
      if (!statusHistory?.length)
        return <p className="text-muted my-8 text-center">{t('empty')}</p>;

      return (
        <div className="flex flex-col gap-4 py-4">
          {statusHistory.map((item) => (
            <div
              key={item.id}
              className="border-border flex flex-col gap-2 rounded-lg border p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">
                  {item.changedByName}
                </span>
                <span className="text-caption text-muted" dir="ltr">
                  {item.createdAtLabel}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <TicketStatusChip
                  status={item.oldStatus}
                  label={tStatuses(item.oldStatus)}
                />
                <ArrowLeft className="text-muted size-4" />
                <TicketStatusChip
                  status={item.newStatus}
                  label={tStatuses(item.newStatus)}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeHistory === 'department') {
      if (isLoadingDepartment) return <HistorySkeleton />;
      if (!departmentHistory?.length)
        return <p className="text-muted my-8 text-center">{t('empty')}</p>;

      return (
        <div className="flex flex-col gap-4 py-4">
          {departmentHistory.map((item) => (
            <div
              key={item.id}
              className="border-border flex flex-col gap-2 rounded-lg border p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">
                  {item.changedByName}
                </span>
                <span className="text-caption text-muted" dir="ltr">
                  {item.createdAtLabel}
                </span>
              </div>
              <div className="text-body-sm mt-2 flex items-center gap-2">
                <span className="text-muted line-through">
                  {item.oldDepartmentName}
                </span>
                <ArrowLeft className="text-muted size-4 shrink-0" />
                <span className="font-medium">{item.newDepartmentName}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeHistory === 'assignment') {
      if (isLoadingAssignment) return <HistorySkeleton />;
      if (!assignmentHistory?.length)
        return <p className="text-muted my-8 text-center">{t('empty')}</p>;

      return (
        <div className="flex flex-col gap-4 py-4">
          {assignmentHistory.map((item) => (
            <div
              key={item.id}
              className="border-border flex flex-col gap-2 rounded-lg border p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">
                  {item.changedByName}
                </span>
                <span className="text-caption text-muted" dir="ltr">
                  {item.createdAtLabel}
                </span>
              </div>
              <div className="text-body-sm mt-2 flex items-center gap-2">
                <span className="text-muted line-through">
                  {item.fromSupportName || '-'}
                </span>
                <ArrowLeft className="text-muted size-4 shrink-0" />
                <span className="font-medium">{item.toSupportName || '-'}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const titles = {
    status: t('statusTitle'),
    department: t('departmentTitle'),
    assignment: t('assignmentTitle'),
  };

  return (
    <PModal
      isOpen={!!activeHistory}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      intent="content"
      title={activeHistory ? titles[activeHistory] : ''}
      ariaLabel={activeHistory ? titles[activeHistory] : t('empty')}
      classNames={{
        body: 'max-h-[70vh] overflow-y-auto px-6 py-4',
      }}
      footer={false}
    >
      {renderContent()}
    </PModal>
  );
};

export default HistoryModals;
