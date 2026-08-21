import { z } from 'zod';

export const exportReportSchema = z
  .object({
    reportType: z.enum(
      [
        'generalTickets',
        'supportPerformance',
        'departmentStatistics',
        'responseTime',
      ],
      { error: 'validation.reportTypeRequired' },
    ),
    dateFrom: z.string().min(1, 'validation.dateFromRequired'),
    dateTo: z.string().min(1, 'validation.dateToRequired'),
    departmentId: z.string().optional(),
    supportId: z.string().optional(),
    granularity: z.enum(['day', 'week', 'month']),
  })
  .refine(
    (value) => !value.dateFrom || !value.dateTo || value.dateFrom <= value.dateTo,
    {
      message: 'validation.dateRangeInvalid',
      path: ['dateTo'],
    },
  );

export type ExportReportFormValues = z.infer<typeof exportReportSchema>;
