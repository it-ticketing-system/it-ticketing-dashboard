'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MobileFilterTrigger } from '@/components/shared';
import { PModal } from '@/components/ui';
import ReportFilterFields from './report-filter-fields';
import type { ReportsFiltersValue } from './reports-query';

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
      <MobileFilterTrigger
        label={t('filters.mobile.title')}
        ariaLabel={t('filters.mobile.openAriaLabel')}
        activeCount={activeFilterCount}
        onPress={openFilters}
        className="border-field-border h-11 min-w-0 flex-1 justify-between rounded-md"
      />

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
        <ReportFilterFields filters={draft} onChange={setDraft} />
      </PModal>
    </>
  );
};

export default ReportMobileFilters;
