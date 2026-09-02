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
  SelectDepartment,
  SelectStatus,
  SelectSupport,
} from '@/components/shared';
import { QUERY_KEYS, ROUTES } from '@/constants';
import { usePostRequest } from '@/hooks';
import type { TicketDetails } from '../types';
import type { TicketStatus } from '@/models';

const HistoryModals = dynamic(() => import('./history-modals'), { ssr: false });
const MobileOperationsModal = dynamic(
  () => import('./mobile-operations-modal'),
  { ssr: false },
);

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

      <MobileOperationsModal
        isOpen={isMobileOperationsOpen}
        onOpenChange={setIsMobileOperationsOpen}
        title={t('operations.title')}
        status={ticket.status}
        departmentId={ticket.departmentId}
        assignedSupportId={ticket.assignedSupport?.id}
        canChangeStatus={availableActions.canChangeStatus}
        canChangeDepartment={availableActions.canChangeDepartment}
        canChangeAssignment={availableActions.canChangeAssignment}
        isChangingStatus={isChangingStatus}
        isChangingDepartment={isChangingDepartment}
        isChangingSupport={isChangingSupport}
        changeStatusLabel={t('operations.changeStatus')}
        selectStatusLabel={t('operations.selectStatus')}
        changeDepartmentLabel={t('operations.changeDepartment')}
        selectDepartmentLabel={t('operations.selectDepartment')}
        changeSupportLabel={t('operations.changeSupport')}
        selectSupportLabel={t('operations.selectSupport')}
        onChangeStatus={(val) => {
          if (val && val !== ticket.status) {
            changeStatus(val as TicketStatus);
          }
        }}
        onChangeDepartment={(val) => {
          if (val && val !== ticket.departmentId) {
            changeDepartment(String(val));
          }
        }}
        onChangeSupport={(val) => {
          if (val && val !== ticket.assignedSupport?.id) {
            changeSupport(String(val));
          }
        }}
      />

      <section className="border-border bg-surface hidden w-80 shrink-0 flex-col gap-6 rounded-xl border p-6 lg:flex">
        <div className="flex items-center justify-between">
          <h2 className="text-h3">{t('operations.title')}</h2>
          {historyDropdown}
        </div>
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
            isDisabled={
              !availableActions.canChangeAssignment || isChangingSupport
            }
          />
        </div>
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
