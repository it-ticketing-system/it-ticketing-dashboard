'use client';

import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  MobileFilterTrigger,
  SelectStatus,
  SelectDepartment,
  PersianDateField,
  SearchInput,
} from '@/components/shared';
import { PModal } from '@/components/ui';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';
import {
  EMPTY_FILTER_DRAFT,
  type FilterDraft,
  type TicketFiltersPatch,
} from './types';
import type { TicketStatus } from '@/models';

type TicketMobileFiltersProps = {
  status: string;
  department: string;
  support: string;
  user: string;
  createdFrom: string;
  createdTo: string;
  activeFilterCount: number;
  isPending: boolean;
  onApplyFilters: (patch: TicketFiltersPatch) => void;
};

const TicketMobileFilters = ({
  status,
  department,
  support,
  user,
  createdFrom,
  createdTo,
  activeFilterCount,
  isPending,
  onApplyFilters,
}: TicketMobileFiltersProps) => {
  const t = useTranslations('tickets.filters');
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<FilterDraft>(EMPTY_FILTER_DRAFT);

  const handleDraftChange =
    (key: keyof FilterDraft) => (value: string | null) => {
      setDraft((previous) => ({
        ...previous,
        [key]: value || '',
      }));
    };

  const openFilters = () => {
    setDraft({
      status,
      department,
      support,
      user,
      createdFrom,
      createdTo,
    });
    setIsOpen(true);
  };

  const applyFilters = () => {
    onApplyFilters({
      status: draft.status || null,
      department: draft.department || null,
      support: draft.support || null,
      user: draft.user || null,
      createdFrom: draft.createdFrom || null,
      createdTo: draft.createdTo || null,
    });
  };

  return (
    <>
      <section aria-label={t('sectionAriaLabel')} className="lg:hidden">
        <div className="flex items-center gap-3">
          <MobileFilterTrigger
            variant="icon"
            label={t('mobile.heading')}
            ariaLabel={t('mobile.openAriaLabel')}
            activeCount={activeFilterCount}
            onPress={openFilters}
            badgeClassName="bg-danger text-badge text-danger-foreground text-[10px]"
          />
        </div>
      </section>

      <PModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        intent="action"
        title={t('mobile.heading')}
        description={t('mobile.description')}
        ariaLabel={t('mobile.dialogAriaLabel')}
        scroll="inside"
        size="lg"
        classNames={{
          backdrop: 'lg:hidden',
          container: 'lg:hidden',
          dialog: 'lg:hidden',
          header: 'border-separator py-4',
          body: 'flex flex-col gap-5 py-5',
          footer: 'border-separator',
        }}
        footer={{
          submit: {
            onPress: applyFilters,
            isPending,
            icon: isPending ? (
              <LoaderCircle
                aria-hidden="true"
                className={cn(ICON_SIZE_CLASS.sm, 'animate-spin')}
              />
            ) : null,
          },
        }}
      >
        <SelectStatus
          label={t('status.label')}
          ariaLabel={t('status.ariaLabel')}
          placeholder={t('status.placeholder')}
          value={draft.status as TicketStatus}
          onChange={handleDraftChange('status')}
          emptyOptionLabel={t('status.allOption')}
        />

        <SelectDepartment
          label={t('department.label')}
          ariaLabel={t('department.ariaLabel')}
          placeholder={t('department.placeholder')}
          value={draft.department}
          onChange={handleDraftChange('department')}
          emptyOptionLabel={t('department.allOption')}
        />

        <SearchInput
          label={t('support.label')}
          ariaLabel={t('support.ariaLabel')}
          placeholder={t('support.placeholder')}
          queryValue={draft.support || ''}
          onValueChange={handleDraftChange('support')}
          showSearchIcon={false}
        />

        <SearchInput
          label={t('user.label')}
          ariaLabel={t('user.ariaLabel')}
          placeholder={t('user.placeholder')}
          queryValue={draft.user || ''}
          onValueChange={handleDraftChange('user')}
          showSearchIcon={false}
        />

        <div className="space-y-3">
          <p className="text-body-sm text-foreground font-medium">
            {t('createdDateRange.heading')}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <PersianDateField
              label={t('dateRange.from')}
              value={draft.createdFrom}
              max={draft.createdTo || undefined}
              onChange={handleDraftChange('createdFrom')}
            />
            <PersianDateField
              label={t('dateRange.to')}
              value={draft.createdTo}
              min={draft.createdFrom || undefined}
              onChange={handleDraftChange('createdTo')}
            />
          </div>
        </div>
      </PModal>
    </>
  );
};

export default TicketMobileFilters;
