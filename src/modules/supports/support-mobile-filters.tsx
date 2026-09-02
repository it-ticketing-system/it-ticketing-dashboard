'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  MobileFilterTrigger,
  SelectAvailability,
  SelectDepartment,
} from '@/components/shared';
import { PModal } from '@/components/ui';
import type { SupportsFiltersValue } from './supports-query';

type SupportMobileFiltersProps = {
  filters: SupportsFiltersValue;
  onApplyFilters: (patch: Partial<SupportsFiltersValue>) => void;
};

const SupportMobileFilters = ({
  filters,
  onApplyFilters,
}: SupportMobileFiltersProps) => {
  const t = useTranslations('supports.filters');
  const [isOpen, setIsOpen] = useState(false);

  const [draft, setDraft] = useState<SupportsFiltersValue>({ ...filters });

  const handleOpen = () => {
    setDraft({ ...filters });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    onApplyFilters(draft);
    handleClose();
  };

  const activeCount = [filters.departmentId, filters.availabilityStatus].filter(
    Boolean,
  ).length;

  return (
    <>
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
          body: 'flex flex-col gap-5 px-6 py-5',
        }}
        footer={{
          submit: {
            onPress: handleApply,
          },
        }}
      >
        <SelectDepartment
          label={t('departmentLabel')}
          ariaLabel={t('departmentLabel')}
          value={draft.departmentId ? String(draft.departmentId) : null}
          onChange={(val) =>
            setDraft((prev) => ({
              ...prev,
              departmentId: val ? Number(val) : undefined,
            }))
          }
          placeholder={t('departmentPlaceholder')}
          emptyOptionLabel={t('allOption')}
        />

        <SelectAvailability
          label={t('availabilityLabel')}
          ariaLabel={t('availabilityLabel')}
          value={draft.availabilityStatus || null}
          onChange={(val) =>
            setDraft((prev) => ({
              ...prev,
              availabilityStatus: val || undefined,
            }))
          }
          placeholder={t('availabilityPlaceholder')}
          emptyOptionLabel={t('allOption')}
        />
      </PModal>

      <MobileFilterTrigger
        variant="icon"
        label={t('mobile.heading')}
        ariaLabel={t('mobile.openAriaLabel')}
        activeCount={activeCount}
        onPress={handleOpen}
      />
    </>
  );
};

export default SupportMobileFilters;
