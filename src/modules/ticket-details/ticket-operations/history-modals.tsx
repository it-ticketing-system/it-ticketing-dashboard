'use client';

import { useTranslations } from 'next-intl';
import { Modal, Spinner } from '@heroui/react';
import { useGetRequest } from '@/hooks';
import { QUERY_KEYS } from '@/constants';
import { clientTicketServices } from '@/apis/services/tickets/client';
import { ArrowLeft } from 'lucide-react';
import { TicketStatusChip } from '@/components/shared';

interface HistoryModalsProps {
  ticketId: string;
  activeHistory: 'status' | 'department' | 'assignment' | null;
  onClose: () => void;
}

const HistoryModals = ({ ticketId, activeHistory, onClose }: HistoryModalsProps) => {
  const t = useTranslations('ticketDetails.historyModals');
  const tStatuses = useTranslations('common.statuses');

  const { data: statusHistory, isLoading: isLoadingStatus } = useGetRequest({
    queryKey: QUERY_KEYS.tickets.statusHistory(ticketId),
    requestFn: () => clientTicketServices.getStatusHistory(ticketId),
    enabled: activeHistory === 'status',
  });

  const { data: departmentHistory, isLoading: isLoadingDepartment } = useGetRequest({
    queryKey: QUERY_KEYS.tickets.departmentHistory(ticketId),
    requestFn: () => clientTicketServices.getDepartmentHistory(ticketId),
    enabled: activeHistory === 'department',
  });

  const { data: assignmentHistory, isLoading: isLoadingAssignment } = useGetRequest({
    queryKey: QUERY_KEYS.tickets.assignmentHistory(ticketId),
    requestFn: () => clientTicketServices.getAssignmentHistory(ticketId),
    enabled: activeHistory === 'assignment',
  });

  const renderContent = () => {
    if (activeHistory === 'status') {
      if (isLoadingStatus) return <Spinner className="my-8" />;
      if (!statusHistory?.length) return <p className="my-8 text-center text-muted">{t('empty')}</p>;
      
      return (
        <div className="flex flex-col gap-4 py-4">
          {statusHistory.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">{item.changedByName}</span>
                <span className="text-caption text-muted" dir="ltr">{item.createdAtLabel}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TicketStatusChip status={item.oldStatus} label={tStatuses(item.oldStatus)} />
                <ArrowLeft className="text-muted size-4" />
                <TicketStatusChip status={item.newStatus} label={tStatuses(item.newStatus)} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeHistory === 'department') {
      if (isLoadingDepartment) return <Spinner className="my-8" />;
      if (!departmentHistory?.length) return <p className="my-8 text-center text-muted">{t('empty')}</p>;

      return (
        <div className="flex flex-col gap-4 py-4">
          {departmentHistory.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">{item.changedByName}</span>
                <span className="text-caption text-muted" dir="ltr">{item.createdAtLabel}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-body-sm">
                <span className="text-muted line-through">{item.oldDepartmentName}</span>
                <ArrowLeft className="text-muted size-4 shrink-0" />
                <span className="font-medium">{item.newDepartmentName}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeHistory === 'assignment') {
      if (isLoadingAssignment) return <Spinner className="my-8" />;
      if (!assignmentHistory?.length) return <p className="my-8 text-center text-muted">{t('empty')}</p>;

      return (
        <div className="flex flex-col gap-4 py-4">
          {assignmentHistory.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">{item.changedByName}</span>
                <span className="text-caption text-muted" dir="ltr">{item.createdAtLabel}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-body-sm">
                <span className="text-muted line-through">{item.fromSupportName || '-'}</span>
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
    <Modal>
      <Modal.Backdrop isOpen={!!activeHistory} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <Modal.Container>
          <Modal.Dialog className="bg-surface rounded-xl shadow-xl">
            <Modal.Header className="border-b border-border py-4 px-6">
              <Modal.Heading className="text-h3">{activeHistory ? titles[activeHistory] : ''}</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="py-4 px-6 max-h-[70vh] overflow-y-auto">
              {renderContent()}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default HistoryModals;
