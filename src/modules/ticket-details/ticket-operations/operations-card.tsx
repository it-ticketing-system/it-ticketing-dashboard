'use client';

import { Button, Dropdown } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { History, Settings } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { clientTicketServices } from '@/apis/services/tickets/client';
import {
  SelectStatus,
  SelectDepartment,
  SelectSupport,
} from '@/components/shared';
import { PModal } from '@/components/ui';
import { QUERY_KEYS, ROUTES } from '@/constants';
import { usePostRequest } from '@/hooks';
import type { TicketDetails } from '../types';
import type { TicketStatus } from '@/models';

const HistoryModals = dynamic(() => import('./history-modals'), { ssr: false });

interface OperationsCardProps {
  ticket: TicketDetails;
}

const OperationsCard = ({ ticket }: OperationsCardProps) => {
  const t = useTranslations('ticketDetails');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { availableActions } = ticket;

  const [activeHistory, setActiveHistory] = useState<
    'status' | 'department' | 'assignment' | null
  >(null);
  const [isMobileOperationsOpen, setIsMobileOperationsOpen] = useState(false);

  const invalidateTicketQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tickets.details(ticket.id),
      }),
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tickets.lists,
      }),
    ]);
  };

  const { mutateAsync: changeStatus, isPending: isChangingStatus } =
    usePostRequest<TicketStatus, void>({
      requestFn: (newStatus: TicketStatus) =>
        clientTicketServices.changeTicketStatus(ticket.id, {
          status: newStatus,
        }),
      getSuccessDescription: () => t('operations.statusChangedSuccess'),
      onSuccess: async () => {
        await invalidateTicketQueries();
      },
    });

  const { mutateAsync: changeDepartment, isPending: isChangingDepartment } =
    usePostRequest<string, void>({
      requestFn: (departmentId: string) =>
        clientTicketServices.changeTicketDepartment(ticket.id, {
          departmentId,
        }),
      getSuccessDescription: () => t('operations.departmentChangedSuccess'),
      onSuccess: async () => {
        await invalidateTicketQueries();
        router.push(ROUTES.tickets);
      },
    });

  const { mutateAsync: changeSupport, isPending: isChangingSupport } =
    usePostRequest<string, void>({
      requestFn: (supportId: string) =>
        clientTicketServices.changeTicketAssignment(ticket.id, { supportId }),
      getSuccessDescription: () => t('operations.assignmentChangedSuccess'),
      onSuccess: async () => {
        await invalidateTicketQueries();
      },
    });

  if (!availableActions) return null;

  const historyDropdown = (
    <Dropdown>
      <Button isIconOnly variant="ghost" aria-label={t('operations.history')}>
        <History className="size-5" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label={t('operations.history')}
          onAction={(key) =>
            setActiveHistory(key as 'status' | 'department' | 'assignment')
          }
        >
          <Dropdown.Item id="status">
            {t('operations.statusHistory')}
          </Dropdown.Item>
          <Dropdown.Item id="department">
            {t('operations.departmentHistory')}
          </Dropdown.Item>
          <Dropdown.Item id="assignment">
            {t('operations.assignmentHistory')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );

  const operationsContent = (
    <div className="flex flex-col gap-4">
      <SelectStatus
        value={ticket.status}
        onChange={(val) => {
          if (val && val !== ticket.status) {
            changeStatus(val as TicketStatus);
          }
        }}
        label={t('operations.changeStatus')}
        placeholder={t('operations.selectStatus')}
        isDisabled={!availableActions.canChangeStatus || isChangingStatus}
      />

      <SelectDepartment
        value={ticket.departmentId || null}
        onChange={(val) => {
          if (val && val !== ticket.departmentId) {
            changeDepartment(String(val));
          }
        }}
        label={t('operations.changeDepartment')}
        placeholder={t('operations.selectDepartment')}
        isDisabled={
          !availableActions.canChangeDepartment || isChangingDepartment
        }
      />

      <SelectSupport
        departmentId={ticket.departmentId}
        value={ticket.assignedSupport?.id || null}
        onChange={(val) => {
          if (val && val !== ticket.assignedSupport?.id) {
            changeSupport(String(val));
          }
        }}
        label={t('operations.changeSupport')}
        placeholder={t('operations.selectSupport')}
        isDisabled={!availableActions.canChangeAssignment || isChangingSupport}
      />
    </div>
  );

  return (
    <>
      <div className="mb-2 flex items-center gap-2 lg:hidden">
        {historyDropdown}
        <Button
          isIconOnly
          variant="outline"
          aria-label={t('operations.title')}
          onPress={() => setIsMobileOperationsOpen(true)}
        >
          <Settings className="size-5" />
        </Button>
      </div>

      <PModal
        isOpen={isMobileOperationsOpen}
        onOpenChange={setIsMobileOperationsOpen}
        intent="action"
        title={t('operations.title')}
        ariaLabel={t('operations.title')}
        classNames={{
          backdrop: 'lg:hidden',
          container: 'lg:hidden',
          dialog: 'flex flex-col overflow-hidden lg:hidden',
          header: 'shrink-0',
          body: 'overflow-y-auto px-6 py-6',
        }}
        footer={false}
      >
        {operationsContent}
      </PModal>

      <section className="border-border bg-surface hidden w-80 shrink-0 flex-col gap-6 rounded-xl border p-6 lg:flex">
        <div className="flex items-center justify-between">
          <h2 className="text-h3">{t('operations.title')}</h2>
          {historyDropdown}
        </div>

        {operationsContent}
      </section>

      <HistoryModals
        ticketId={ticket.id}
        activeHistory={activeHistory}
        onClose={() => setActiveHistory(null)}
      />
    </>
  );
};

export default OperationsCard;
