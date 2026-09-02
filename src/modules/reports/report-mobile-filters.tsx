'use client';

import { Button, Tabs } from '@heroui/react';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SelectDepartment, SelectSupport } from '@/components/shared';
import { PModal } from '@/components/ui';
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

  const applyFilters = () => {
    onApplyFilters(draft);
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

      <PModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        intent="action"
        title={t('filters.mobile.heading')}
        description={t('filters.mobile.description')}
        ariaLabel={t('filters.mobile.dialogAriaLabel')}
        scroll="inside"
        size="lg"
        classNames={{
          backdrop: 'lg:hidden',
          container: 'lg:hidden',
          dialog: 'lg:hidden',
          body: 'flex flex-col gap-5 px-6 py-5',
        }}
        footer={{
          submit: {
            onPress: applyFilters,
          },
        }}
      >
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
              <Tabs.Tab key={range} id={range} className="justify-center">
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
          emptyOptionLabel={t('filters.department.allOption')}
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
          emptyOptionLabel={t('filters.support.allOption')}
        />
      </PModal>
    </>
  );
};

export default ReportMobileFilters;
