'use client';

import {
  SelectDepartment,
  SelectStatus,
  SelectSupport,
} from '@/components/shared';
import { PModal } from '@/components/ui';
import type { TicketStatus } from '@/models';

type MobileOperationsModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  status: TicketStatus;
  departmentId: string | null | undefined;
  assignedSupportId: string | null | undefined;
  canChangeStatus: boolean;
  canChangeDepartment: boolean;
  canChangeAssignment: boolean;
  isChangingStatus: boolean;
  isChangingDepartment: boolean;
  isChangingSupport: boolean;
  changeStatusLabel: string;
  selectStatusLabel: string;
  changeDepartmentLabel: string;
  selectDepartmentLabel: string;
  changeSupportLabel: string;
  selectSupportLabel: string;
  onChangeStatus: (value: string | null) => void;
  onChangeDepartment: (value: string | null) => void;
  onChangeSupport: (value: string | null) => void;
};

const MobileOperationsModal = ({
  isOpen,
  onOpenChange,
  title,
  status,
  departmentId,
  assignedSupportId,
  canChangeStatus,
  canChangeDepartment,
  canChangeAssignment,
  isChangingStatus,
  isChangingDepartment,
  isChangingSupport,
  changeStatusLabel,
  selectStatusLabel,
  changeDepartmentLabel,
  selectDepartmentLabel,
  changeSupportLabel,
  selectSupportLabel,
  onChangeStatus,
  onChangeDepartment,
  onChangeSupport,
}: MobileOperationsModalProps) => {
  return (
    <PModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      intent="action"
      title={title}
      ariaLabel={title}
      classNames={{
        backdrop: 'lg:hidden',
        container: 'lg:hidden',
        dialog: 'flex flex-col overflow-hidden lg:hidden',
        header: 'shrink-0',
        body: 'overflow-y-auto px-6 py-6',
      }}
      footer={false}
    >
      <div className="flex flex-col gap-4">
        <SelectStatus
          value={status}
          onChange={onChangeStatus}
          label={changeStatusLabel}
          placeholder={selectStatusLabel}
          isDisabled={!canChangeStatus || isChangingStatus}
        />

        <SelectDepartment
          value={departmentId || null}
          onChange={onChangeDepartment}
          label={changeDepartmentLabel}
          placeholder={selectDepartmentLabel}
          isDisabled={!canChangeDepartment || isChangingDepartment}
        />

        <SelectSupport
          departmentId={departmentId}
          value={assignedSupportId || null}
          onChange={onChangeSupport}
          label={changeSupportLabel}
          placeholder={selectSupportLabel}
          isDisabled={!canChangeAssignment || isChangingSupport}
        />
      </div>
    </PModal>
  );
};

export default MobileOperationsModal;
