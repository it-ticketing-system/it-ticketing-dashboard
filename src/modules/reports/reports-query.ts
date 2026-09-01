import { getSearchParamValue, toPositiveInteger } from '@/utils';
import type { GetReportsDashboardRequest } from '@/apis/services/reports/client';
import type { ReportGranularity, ReportRange } from '@/models';

const REPORT_RANGE_VALUES = ['today', 'week', 'month', 'year'] as const;

export type ReportsFiltersValue = {
  range: ReportRange;
  department: string;
  support: string;
};

const isReportRange = (value: string): value is ReportRange => {
  return REPORT_RANGE_VALUES.includes(value as ReportRange);
};

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

const subtractDays = (date: Date, days: number): Date => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() - days);
  return nextDate;
};

const subtractMonths = (date: Date, months: number): Date => {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() - months);
  return nextDate;
};

const getRangeParams = (
  range: ReportRange,
): Pick<GetReportsDashboardRequest, 'dateFrom' | 'dateTo' | 'granularity'> => {
  const today = new Date();
  const dateTo = toIsoDate(today);
  const rangeMap: Record<
    ReportRange,
    { dateFrom: string; granularity: ReportGranularity }
  > = {
    today: {
      dateFrom: dateTo,
      granularity: 'day',
    },
    week: {
      dateFrom: toIsoDate(subtractDays(today, 6)),
      granularity: 'day',
    },
    month: {
      dateFrom: toIsoDate(subtractMonths(today, 1)),
      granularity: 'week',
    },
    year: {
      dateFrom: toIsoDate(subtractMonths(today, 12)),
      granularity: 'month',
    },
  };

  return {
    ...rangeMap[range],
    dateTo,
  };
};

export const parseReportsFilters = (
  searchParams: PageSearchParams,
): ReportsFiltersValue => {
  const range = getSearchParamValue(searchParams, 'range');

  return {
    range: isReportRange(range) ? range : 'month',
    department: getSearchParamValue(searchParams, 'department'),
    support: getSearchParamValue(searchParams, 'support'),
  };
};

export const createReportsParams = (
  filters: ReportsFiltersValue,
): GetReportsDashboardRequest => {
  const departmentId = toPositiveInteger(filters.department);
  const supportId = toPositiveInteger(filters.support);

  return {
    ...getRangeParams(filters.range),
    departmentId: departmentId ? String(departmentId) : undefined,
    supportId: supportId ? String(supportId) : undefined,
  };
};
