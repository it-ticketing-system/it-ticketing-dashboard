'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { clientReportServices } from '@/apis/services/reports/client';
import { FilterToolbar, TableErrorState } from '@/components/shared';
import { QUERY_KEYS } from '@/constants';
import { useGetRequest, useQueryState } from '@/hooks';
import ReportFilterFields from './report-filter-fields';
import ReportSummaryCards from './report-summary-cards';
import {
  DepartmentStatisticsChart,
  SupportPerformanceChart,
  TicketTrendChart,
} from './reports-charts';
import {
  createReportsParams,
  parseReportsFilters,
  type ReportsFiltersValue,
} from './reports-query';

const ExportReportModal = dynamic(() => import('./export-report-modal'), {
  ssr: false,
});
const ReportMobileFilters = dynamic(() => import('./report-mobile-filters'), {
  ssr: false,
});

type ReportsClientProps = {
  initialSearchParams: PageSearchParams;
};

const ReportsClient = ({ initialSearchParams }: ReportsClientProps) => {
  const t = useTranslations('reports');
  const tCommon = useTranslations('common');
  const { getQuery, updateQueries } = useQueryState();
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

  const activeFilterCount =
    Number(filters.range !== 'month') +
    Number(Boolean(filters.department)) +
    Number(Boolean(filters.support));

  return (
    <section className="flex flex-col gap-6">
      <FilterToolbar
        ariaLabel={t('filters.mobile.heading')}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 lg:hidden">
          <ReportMobileFilters
            filters={filters}
            activeFilterCount={activeFilterCount}
            onApplyFilters={updateFilter}
          />

          <ExportReportModal
            defaultDepartmentId={filters.department}
            defaultSupportId={filters.support}
          />
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-[1fr_220px_220px_auto] lg:items-end">
          <ReportFilterFields filters={filters} onChange={updateFilter} />

          <ExportReportModal
            defaultDepartmentId={filters.department}
            defaultSupportId={filters.support}
          />
        </div>
      </FilterToolbar>

      {cardsRequest.error ? (
        <TableErrorState
          title={t('states.cardsErrorTitle')}
          errorMessage={tCommon(cardsRequest.error.messageKey)}
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
