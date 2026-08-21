'use client';

import {
  Button,
  FieldError,
  Label,
  ListBox,
  Modal,
  Select,
  TextField,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, FileSpreadsheet, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { clientReportServices } from '@/apis/services/reports/client';
import { PersianDateField, SelectDepartment, SelectSupport } from '@/components/shared';
import { ICON_SIZE_CLASS } from '@/constants';
import { usePostRequest } from '@/hooks';
import { cn, formatFileSize } from '@/utils';
import { exportReportSchema, type ExportReportFormValues } from './reports.schema';
import type { IGeneratedReport, ReportGranularity, ReportType } from '@/models';

const REPORT_TYPES: ReportType[] = [
  'generalTickets',
  'supportPerformance',
  'departmentStatistics',
  'responseTime',
];

const GRANULARITIES: ReportGranularity[] = ['day', 'week', 'month'];

type ExportReportModalProps = {
  defaultDepartmentId?: string;
  defaultSupportId?: string;
};

const ExportReportModal = ({
  defaultDepartmentId = '',
  defaultSupportId = '',
}: ExportReportModalProps) => {
  const t = useTranslations('reports');
  const [isOpen, setIsOpen] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<IGeneratedReport | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExportReportFormValues>({
    resolver: zodResolver(exportReportSchema),
    defaultValues: {
      reportType: 'generalTickets',
      dateFrom: '',
      dateTo: '',
      departmentId: defaultDepartmentId,
      supportId: defaultSupportId,
      granularity: 'day',
    },
  });

  const selectedDepartmentId = useWatch({ control, name: 'departmentId' });
  const selectedDateFrom = useWatch({ control, name: 'dateFrom' });
  const selectedDateTo = useWatch({ control, name: 'dateTo' });

  const exportMutation = usePostRequest({
    requestFn: clientReportServices.exportReport,
    showSuccessToast: false,
    onSuccess: (report) => {
      setGeneratedReport(report);
    },
  });

  const onSubmit = async (values: ExportReportFormValues) => {
    await exportMutation.mutateAsync({
      reportType: values.reportType,
      dateFrom: values.dateFrom,
      dateTo: values.dateTo,
      departmentId: values.departmentId || undefined,
      supportId: values.supportId || undefined,
      granularity: values.granularity,
    });
  };

  const closeModal = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
    if (!nextOpen) {
      setGeneratedReport(null);
      exportMutation.reset();
    }
  };

  return (
    <>
      <Button variant="primary" onPress={() => setIsOpen(true)}>
        <FileSpreadsheet aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
        {t('export.open')}
      </Button>

      <Modal>
        <Modal.Backdrop
          isOpen={isOpen}
          onOpenChange={closeModal}
          variant="opaque"
          className="bg-backdrop"
        >
          <Modal.Container size="lg" scroll="inside">
            <Modal.Dialog
              aria-label={t('export.dialogAriaLabel')}
              className="bg-surface rounded-xl shadow-xl"
            >
              {({ close }) => (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Modal.Header className="border-border border-b px-6 py-4">
                    <Modal.Heading className="text-h3">
                      {t('export.title')}
                    </Modal.Heading>
                  </Modal.Header>

                  <Modal.Body className="grid gap-4 px-6 py-5 md:grid-cols-2">
                    <Controller
                      name="reportType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onChange={(value) => field.onChange(String(value))}
                          isInvalid={Boolean(errors.reportType)}
                        >
                          <Label>{t('export.fields.reportType')}</Label>
                          <Select.Trigger>
                            <Select.Value />
                          </Select.Trigger>
                          <Select.Popover placement="bottom end">
                            <ListBox aria-label={t('export.fields.reportType')}>
                              {REPORT_TYPES.map((type) => (
                                <ListBox.Item
                                  key={type}
                                  id={type}
                                  textValue={t(`reportTypes.${type}`)}
                                >
                                  {t(`reportTypes.${type}`)}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                          <FieldError>
                            {errors.reportType &&
                              t(
                                errors.reportType
                                  .message as Parameters<typeof t>[0],
                              )}
                          </FieldError>
                        </Select>
                      )}
                    />

                    <Controller
                      name="granularity"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onChange={(value) => field.onChange(String(value))}
                        >
                          <Label>{t('export.fields.granularity')}</Label>
                          <Select.Trigger>
                            <Select.Value />
                          </Select.Trigger>
                          <Select.Popover placement="bottom end">
                            <ListBox aria-label={t('export.fields.granularity')}>
                              {GRANULARITIES.map((granularity) => (
                                <ListBox.Item
                                  key={granularity}
                                  id={granularity}
                                  textValue={t(`granularities.${granularity}`)}
                                >
                                  {t(`granularities.${granularity}`)}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      )}
                    />

                    <Controller
                      name="dateFrom"
                      control={control}
                      render={({ field }) => (
                        <TextField isInvalid={Boolean(errors.dateFrom)}>
                          <PersianDateField
                            label={t('export.fields.dateFrom')}
                            value={field.value}
                            max={selectedDateTo || undefined}
                            onChange={field.onChange}
                          />
                          <FieldError>
                            {errors.dateFrom &&
                              t(
                                errors.dateFrom
                                  .message as Parameters<typeof t>[0],
                              )}
                          </FieldError>
                        </TextField>
                      )}
                    />

                    <Controller
                      name="dateTo"
                      control={control}
                      render={({ field }) => (
                        <TextField isInvalid={Boolean(errors.dateTo)}>
                          <PersianDateField
                            label={t('export.fields.dateTo')}
                            value={field.value}
                            min={selectedDateFrom || undefined}
                            onChange={field.onChange}
                          />
                          <FieldError>
                            {errors.dateTo &&
                              t(errors.dateTo.message as Parameters<typeof t>[0])}
                          </FieldError>
                        </TextField>
                      )}
                    />

                    <Controller
                      name="departmentId"
                      control={control}
                      render={({ field }) => (
                        <SelectDepartment
                          label={t('filters.department.label')}
                          placeholder={t('filters.department.placeholder')}
                          value={field.value}
                          onChange={(value) => field.onChange(value || '')}
                        />
                      )}
                    />

                    <Controller
                      name="supportId"
                      control={control}
                      render={({ field }) => (
                        <SelectSupport
                          label={t('filters.support.label')}
                          placeholder={t('filters.support.placeholder')}
                          departmentId={selectedDepartmentId}
                          value={field.value}
                          onChange={(value) => field.onChange(value || '')}
                        />
                      )}
                    />

                    {generatedReport ? (
                      <div className="border-success-200 bg-success-50 md:col-span-2 rounded-xl border p-4">
                        <p className="text-title text-success-900">
                          {t('export.successTitle')}
                        </p>
                        <p className="text-body-sm text-success-700 mt-1">
                          {generatedReport.fileName} -{' '}
                          {formatFileSize(generatedReport.size)}
                        </p>
                        {generatedReport.downloadHref ? (
                          <a
                            href={generatedReport.downloadHref}
                            className="text-button-md text-primary-600 mt-3 inline-flex items-center gap-2"
                          >
                            <Download
                              aria-hidden="true"
                              className={ICON_SIZE_CLASS.sm}
                            />
                            {t('export.download')}
                          </a>
                        ) : (
                          <p className="text-body-sm text-danger-700 mt-3">
                            {t('export.unsafeUrl')}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </Modal.Body>

                  <Modal.Footer className="border-border border-t px-6 py-4">
                    <div className="flex w-full justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onPress={close}
                        className="border-field-border"
                      >
                        {t('export.cancel')}
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        isPending={exportMutation.isPending}
                      >
                        {exportMutation.isPending ? (
                          <LoaderCircle
                            aria-hidden="true"
                            className={cn(ICON_SIZE_CLASS.sm, 'animate-spin')}
                          />
                        ) : (
                          <FileSpreadsheet
                            aria-hidden="true"
                            className={ICON_SIZE_CLASS.sm}
                          />
                        )}
                        {t('export.submit')}
                      </Button>
                    </div>
                  </Modal.Footer>
                </form>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default ExportReportModal;
