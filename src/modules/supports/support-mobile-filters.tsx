'use client';

import { Button } from '@heroui/react';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SelectDepartment, SelectAvailability } from '@/components/shared';
import { PModal } from '@/components/ui';
import { ICON_SIZE_CLASS } from '@/constants';
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
      <section aria-label={t('ariaLabel')} className="w-full sm:hidden">
        <Button
          variant="outline"
          className="flex w-full justify-between sm:hidden"
          onPress={handleOpen}
          aria-label={t('mobile.openAriaLabel')}
        >
          <div className="flex items-center gap-2">
            <Filter aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
            <span>{t('mobile.title')}</span>
          </div>
          {activeCount > 0 && (
            <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs">
              {activeCount}
            </span>
          )}
        </Button>
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
          backdrop: 'sm:hidden',
          container: 'sm:hidden',
          dialog: 'sm:hidden',
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
    </>
  );
};

export default SupportMobileFilters;
