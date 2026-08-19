'use client';

import { Button, Modal } from '@heroui/react';
import { Filter, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SelectDepartment, SelectAvailability } from '@/components/shared';
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

  const handleReset = () => {
    setDraft({
      search: undefined,
      departmentId: undefined,
      availabilityStatus: undefined,
    });
  };

  const activeCount = [filters.departmentId, filters.availabilityStatus].filter(
    Boolean,
  ).length;

  return (
    <>
      <section aria-label={t('ariaLabel')} className="sm:hidden w-full">
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

      <Modal>
        <Modal.Backdrop
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          className="bg-backdrop sm:hidden"
        >
          <Modal.Container
            placement="bottom"
            scroll="inside"
            size="lg"
            className="items-end p-0 sm:hidden"
          >
            <Modal.Dialog
              aria-label={t('mobile.dialogAriaLabel')}
              className="bg-surface max-h-[85dvh] w-full max-w-none rounded-t-xl rounded-b-none shadow-xl"
            >
              {({ close }) => (
                <>
                  <Modal.Header className="border-b py-4 px-6 flex flex-col items-start gap-1">
                    <Modal.Heading className="text-h4 font-bold">
                      {t('mobile.heading')}
                    </Modal.Heading>
                    <p className="text-caption text-muted font-normal">
                      {t('mobile.description')}
                    </p>
                  </Modal.Header>

                  <Modal.Body className="flex flex-col gap-5 py-5 px-6">
                    <SelectDepartment
                      label={t('departmentLabel')}
                      ariaLabel={t('departmentLabel')}
                      value={
                        draft.departmentId ? String(draft.departmentId) : null
                      }
                      onChange={(val) =>
                        setDraft((prev) => ({
                          ...prev,
                          departmentId: val ? Number(val) : undefined,
                        }))
                      }
                      placeholder={t('departmentPlaceholder')}
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
                    />
                  </Modal.Body>

                  <Modal.Footer className="border-t pt-4 pb-[calc(16px+env(safe-area-inset-bottom))] px-6">
                    <div className="flex w-full items-center justify-between gap-3">
                      <Button
                        variant="ghost"
                        size="md"
                        onPress={handleReset}
                        className="text-danger h-11 px-2"
                      >
                        <RotateCcw
                          aria-hidden="true"
                          className={ICON_SIZE_CLASS.sm}
                        />
                        <span>{t('mobile.reset')}</span>
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="md"
                          onPress={close}
                          className="h-11 rounded-md"
                        >
                          {t('mobile.cancel')}
                        </Button>
                        <Button
                          variant="primary"
                          size="md"
                          onPress={() => {
                            handleApply();
                            close();
                          }}
                          className="h-11 rounded-md px-5"
                        >
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

export default SupportMobileFilters;
