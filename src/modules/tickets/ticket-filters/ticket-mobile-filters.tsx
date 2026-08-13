'use client';

import { Button, Modal } from '@heroui/react';
import { Filter, LoaderCircle, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';
import TicketDateField from './ticket-date-field';
import {
  SelectStatus,
  SelectDepartment,
  SearchInput,
} from '@/components/shared';
import {
  EMPTY_FILTER_DRAFT,
  type FilterDraft,
  type TicketFiltersPatch,
} from './types';

type TicketMobileFiltersProps = {
  status: string;
  department: string;
  support: string;
  user: string;
  createdFrom: string;
  createdTo: string;
  updatedFrom: string;
  updatedTo: string;
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
  updatedFrom,
  updatedTo,
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
      updatedFrom,
      updatedTo,
    });
    setIsOpen(true);
  };

  const resetDraft = () => {
    setDraft(EMPTY_FILTER_DRAFT);
  };

  const applyFilters = (close: () => void) => {
    onApplyFilters({
      status: draft.status || null,
      department: draft.department || null,
      support: draft.support || null,
      user: draft.user || null,
      createdFrom: draft.createdFrom || null,
      createdTo: draft.createdTo || null,
      updatedFrom: draft.updatedFrom || null,
      updatedTo: draft.updatedTo || null,
    });
    close();
  };

  return (
    <>
      <section aria-label={t('sectionAriaLabel')} className="lg:hidden">
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            aria-label={t('mobile.openAriaLabel')}
            variant="outline"
            size="md"
            onPress={openFilters}
            className="border-field-border bg-surface relative h-11 min-h-11 w-11 min-w-11 shrink-0 rounded-md"
          >
            <Filter aria-hidden="true" className={ICON_SIZE_CLASS.md} />
            {activeFilterCount > 0 ? (
              <span
                aria-hidden="true"
                className="bg-danger text-badge text-danger-foreground absolute -start-1 -top-1 flex size-5 items-center justify-center rounded-full"
              >
                {activeFilterCount}
              </span>
            ) : null}
          </Button>
        </div>
      </section>

      <Modal>
        <Modal.Backdrop
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          variant="opaque"
          className="bg-backdrop lg:hidden"
        >
          <Modal.Container
            placement="bottom"
            scroll="inside"
            size="lg"
            className="items-end p-0 lg:hidden"
          >
            <Modal.Dialog
              aria-label={t('mobile.dialogAriaLabel')}
              className="bg-surface max-h-[85dvh] w-full max-w-none rounded-t-xl rounded-b-none shadow-xl"
            >
              {({ close }) => (
                <>
                  <Modal.Header className="border-separator flex flex-col items-start gap-1 border-b py-4">
                    <Modal.Heading className="text-title">
                      {t('mobile.heading')}
                    </Modal.Heading>
                    <p className="text-caption text-muted font-normal">
                      {t('mobile.description')}
                    </p>
                  </Modal.Header>

                  <Modal.Body className="flex flex-col gap-5 py-5">
                    <SelectStatus
                      label={t('status.label')}
                      ariaLabel={t('status.ariaLabel')}
                      placeholder={t('status.placeholder')}
                      value={draft.status as any}
                      onChange={handleDraftChange('status')}
                    />

                    <SelectDepartment
                      label={t('department.label')}
                      ariaLabel={t('department.ariaLabel')}
                      placeholder={t('department.placeholder')}
                      value={draft.department}
                      onChange={handleDraftChange('department')}
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
                        <TicketDateField
                          label={t('dateRange.from')}
                          value={draft.createdFrom}
                          max={draft.createdTo || undefined}
                          onChange={handleDraftChange('createdFrom')}
                        />
                        <TicketDateField
                          label={t('dateRange.to')}
                          value={draft.createdTo}
                          min={draft.createdFrom || undefined}
                          onChange={handleDraftChange('createdTo')}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-body-sm text-foreground font-medium">
                        {t('updatedDateRange.heading')}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <TicketDateField
                          label={t('dateRange.from')}
                          value={draft.updatedFrom}
                          max={draft.updatedTo || undefined}
                          onChange={handleDraftChange('updatedFrom')}
                        />
                        <TicketDateField
                          label={t('dateRange.to')}
                          value={draft.updatedTo}
                          min={draft.updatedFrom || undefined}
                          onChange={handleDraftChange('updatedTo')}
                        />
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer className="border-separator border-t pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
                    <div className="flex w-full items-center justify-between gap-3">
                      <Button
                        variant="ghost"
                        size="md"
                        onPress={resetDraft}
                        className="text-danger h-11 px-2"
                      >
                        <RotateCcw
                          aria-hidden="true"
                          className={ICON_SIZE_CLASS.sm}
                        />
                        {t('mobile.reset')}
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="md"
                          onPress={close}
                          className="border-field-border h-11 rounded-md"
                        >
                          {t('mobile.cancel')}
                        </Button>

                        <Button
                          variant="primary"
                          size="md"
                          isPending={isPending}
                          onPress={() => applyFilters(close)}
                          className="h-11 rounded-md px-5"
                        >
                          {isPending ? (
                            <LoaderCircle
                              aria-hidden="true"
                              className={cn(ICON_SIZE_CLASS.sm, 'animate-spin')}
                            />
                          ) : null}
                          {t('mobile.apply')}
                        </Button>
                      </div>
                    </div>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default TicketMobileFilters;
