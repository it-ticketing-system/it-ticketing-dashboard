'use client';

import { Button, Modal, Tabs } from '@heroui/react';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SelectDepartment, SelectSupport } from '@/components/shared';
import { ICON_SIZE_CLASS } from '@/constants';
import type { ReportsFiltersValue } from './reports-query';
import type { ReportRange } from '@/models';

const RANGE_OPTIONS: ReportRange[] = ['today', 'week', 'month', 'year'];

type ReportMobileFiltersProps = {
  filters: ReportsFiltersValue;
  activeFilterCount: number;
  onApplyFilters: (patch: Partial<ReportsFiltersValue>) => void;
};

const ReportMobileFilters = ({
  filters,
  activeFilterCount,
  onApplyFilters,
}: ReportMobileFiltersProps) => {
  const t = useTranslations('reports');
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<ReportsFiltersValue>(filters);

  const openFilters = () => {
    setDraft(filters);
    setIsOpen(true);
  };

  const applyFilters = (close: () => void) => {
    onApplyFilters(draft);
    close();
  };

  return (
    <>
      <Button
        variant="outline"
        onPress={openFilters}
        aria-label={t('filters.mobile.openAriaLabel')}
        className="border-field-border h-11 min-w-0 flex-1 justify-between rounded-md"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Filter aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          <span className="truncate">{t('filters.mobile.title')}</span>
        </span>

        {activeFilterCount > 0 ? (
          <span className="bg-primary text-primary-foreground flex size-5 shrink-0 items-center justify-center rounded-full text-xs">
            {activeFilterCount}
          </span>
        ) : null}
      </Button>

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
              aria-label={t('filters.mobile.dialogAriaLabel')}
              className="bg-surface max-h-[85dvh] w-full max-w-none rounded-t-xl rounded-b-none shadow-xl"
            >
              {({ close }) => (
                <>
                  <Modal.Header className="border-border flex flex-col items-start gap-1 border-b px-6 py-4">
                    <Modal.Heading className="text-h3">
                      {t('filters.mobile.heading')}
                    </Modal.Heading>
                    <p className="text-caption text-muted font-normal">
                      {t('filters.mobile.description')}
                    </p>
                  </Modal.Header>

                  <Modal.Body className="flex flex-col gap-5 px-6 py-5">
                    <Tabs
                      selectedKey={draft.range}
                      onSelectionChange={(key) =>
                        setDraft((previous) => ({
                          ...previous,
                          range: key as ReportRange,
                        }))
                      }
                      variant="secondary"
                      aria-label={t('filters.range.ariaLabel')}
                    >
                      <Tabs.List className="grid w-full grid-cols-4">
                        {RANGE_OPTIONS.map((range) => (
                          <Tabs.Tab
                            key={range}
                            id={range}
                            className="justify-center"
                          >
                            {t(`ranges.${range}`)}
                          </Tabs.Tab>
                        ))}
                      </Tabs.List>
                    </Tabs>

                    <SelectDepartment
                      label={t('filters.department.label')}
                      placeholder={t('filters.department.placeholder')}
                      ariaLabel={t('filters.department.ariaLabel')}
                      value={draft.department}
                      onChange={(department) =>
                        setDraft((previous) => ({
                          ...previous,
                          department: department || '',
                          support: '',
                        }))
                      }
                    />

                    <SelectSupport
                      label={t('filters.support.label')}
                      placeholder={t('filters.support.placeholder')}
                      ariaLabel={t('filters.support.ariaLabel')}
                      departmentId={draft.department}
                      value={draft.support}
                      onChange={(support) =>
                        setDraft((previous) => ({
                          ...previous,
                          support: support || '',
                        }))
                      }
                    />
                  </Modal.Body>

                  <Modal.Footer className="border-border border-t px-6 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
                    <div className="flex w-full items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="md"
                        onPress={close}
                        className="border-field-border h-11 rounded-md"
                      >
                        {t('filters.mobile.cancel')}
                      </Button>

                      <Button
                        variant="primary"
                        size="md"
                        onPress={() => applyFilters(close)}
                        className="h-11 rounded-md px-5"
                      >
                        {t('filters.mobile.apply')}
                      </Button>
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

export default ReportMobileFilters;
