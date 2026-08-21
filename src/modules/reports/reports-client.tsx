'use client';

import { Button, Card, CardContent, Tabs } from '@heroui/react';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { clientReportServices } from '@/apis/services/reports/client';
import {
  SelectDepartment,
  SelectSupport,
  TableErrorState,
} from '@/components/shared';
import { ICON_SIZE_CLASS, QUERY_KEYS } from '@/constants';
import { useGetRequest, useQueryState } from '@/hooks';
import ExportReportModal from './export-report-modal';
import ReportSummaryCards from './report-summary-cards';
import {
  DepartmentStatisticsChart,
  SupportPerformanceChart,
  TicketTrendChart,
} from './reports-charts';
import {
  REPORT_FILTER_QUERY_KEYS,
  createReportsParams,
  parseReportsFilters,
  type ReportsFiltersValue,
} from './reports-query';
import type { ReportRange } from '@/models';

const RANGE_OPTIONS: ReportRange[] = ['today', 'week', 'month', 'year'];

type ReportsClientProps = {
  initialSearchParams: PageSearchParams;
};

const ReportsClient = ({ initialSearchParams }: ReportsClientProps) => {
  const t = useTranslations('reports');
  const tCommon = useTranslations('common');
  const { getQuery, updateQueries, removeQueries } = useQueryState();
  const initialFilters = parseReportsFilters(initialSearchParams);
  const filters = parseReportsFilters({
    range: getQuery('range') ?? initialFilters.range,
    department: getQuery('department') ?? initialFilters.department,
    support: getQuery('support') ?? initialFilters.support,
  });
  const requestParams = createReportsParams(filters);
  const queryParams = { ...requestParams };

  const cardsRequest = useGetRequest({
    queryKey: QUERY_KEYS.reports.cards(queryParams),
    requestFn: (signal) => clientReportServices.getCards(requestParams, signal),
    keepPreviousData: true,
    showErrorToast: false,
  });

  const trendRequest = useGetRequest({
    queryKey: QUERY_KEYS.reports.ticketTrend(queryParams),
    requestFn: (signal) =>
      clientReportServices.getTicketTrend(requestParams, signal),
    keepPreviousData: true,
    showErrorToast: false,
  });

  const departmentRequest = useGetRequest({
    queryKey: QUERY_KEYS.reports.departmentStatistics(queryParams),
    requestFn: (signal) =>
      clientReportServices.getDepartmentStatistics(requestParams, signal),
    keepPreviousData: true,
    showErrorToast: false,
  });

  const supportRequest = useGetRequest({
    queryKey: QUERY_KEYS.reports.supportPerformance(queryParams),
    requestFn: (signal) =>
      clientReportServices.getSupportPerformance(requestParams, signal),
    keepPreviousData: true,
    showErrorToast: false,
  });

  const updateFilter = (patch: Partial<ReportsFiltersValue>) => {
    updateQueries(patch, {
      history: 'replace',
      scroll: false,
      strategy: 'native',
    });
  };

  const resetFilters = () => {
    removeQueries(REPORT_FILTER_QUERY_KEYS, {
      history: 'replace',
      scroll: false,
      strategy: 'native',
    });
  };

  const hasActiveFilters =
    filters.range !== 'month' || Boolean(filters.department || filters.support);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-end">
        <ExportReportModal
          defaultDepartmentId={filters.department}
          defaultSupportId={filters.support}
        />
      </div>

      <Card className="border-neutral-200/80 shadow-xs">
        <CardContent className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto] lg:items-end">
          <Tabs
            selectedKey={filters.range}
            onSelectionChange={(key) =>
              updateFilter({ range: key as ReportRange })
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
            value={filters.department}
            onChange={(department) =>
              updateFilter({ department: department || '', support: '' })
            }
          />

          <SelectSupport
            label={t('filters.support.label')}
            placeholder={t('filters.support.placeholder')}
            ariaLabel={t('filters.support.ariaLabel')}
            departmentId={filters.department}
            value={filters.support}
            onChange={(support) => updateFilter({ support: support || '' })}
          />

          <Button
            variant="outline"
            isDisabled={!hasActiveFilters}
            onPress={resetFilters}
            className="border-field-border h-11"
          >
            <RotateCcw aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
            {t('actions.reset')}
          </Button>
        </CardContent>
      </Card>

      {cardsRequest.error ? (
        <TableErrorState
          title={t('states.cardsErrorTitle')}
          errorMessage={tCommon(cardsRequest.error.messageKey)}
          retryLabel={t('actions.retry')}
          isRetrying={cardsRequest.isFetching}
          onRetry={() => void cardsRequest.refetch().catch(() => undefined)}
          className="border-border bg-surface rounded-xl border shadow-sm"
        />
      ) : (
        <ReportSummaryCards
          cards={cardsRequest.data}
          isLoading={cardsRequest.isLoading}
        />
      )}

      <TicketTrendChart
        trend={trendRequest.data}
        error={trendRequest.error}
        isLoading={trendRequest.isLoading}
        isRetrying={trendRequest.isFetching}
        onRetry={() => void trendRequest.refetch().catch(() => undefined)}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DepartmentStatisticsChart
          items={departmentRequest.data}
          error={departmentRequest.error}
          isLoading={departmentRequest.isLoading}
          isRetrying={departmentRequest.isFetching}
          onRetry={() =>
            void departmentRequest.refetch().catch(() => undefined)
          }
        />
        <SupportPerformanceChart
          items={supportRequest.data}
          error={supportRequest.error}
          isLoading={supportRequest.isLoading}
          isRetrying={supportRequest.isFetching}
          onRetry={() => void supportRequest.refetch().catch(() => undefined)}
        />
      </div>
    </section>
  );
};

export default ReportsClient;
