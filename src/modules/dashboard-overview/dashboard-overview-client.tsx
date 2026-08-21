'use client';

import { CheckCircle2, CircleDot, Clock3, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { clientManagementOverviewServices } from '@/apis/services/overview/client';
import { QUERY_KEYS } from '@/constants';
import { useGetRequest } from '@/hooks';
import { DashboardEmptyState, DashboardErrorState } from './dashboard-states';
import OverviewMetrics from './overview-metrics';
import { MetricsSkeleton } from './skeleton/dashboard-overview-skeletons';
import TrendCard from './trend-card';
import type {
  PrimaryMetricDefinition,
  SecondaryMetricDefinition,
} from './types';
import type { OverviewTrendRange } from '@/models';

const DashboardOverviewClient = () => {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const [range, setRange] = useState<OverviewTrendRange>('week');

  const overviewRequest = useGetRequest({
    queryKey: QUERY_KEYS.managementOverview.cards,
    requestFn: clientManagementOverviewServices.getOverview,
  });

  const trendRequest = useGetRequest({
    queryKey: QUERY_KEYS.managementOverview.trend(range),
    requestFn: (signal) =>
      clientManagementOverviewServices.getOverviewTrend({ range }, signal),
  });

  const primaryMetrics = useMemo<PrimaryMetricDefinition[]>(
    () => [
      {
        key: 'totalTickets',
        title: t('metrics.totalTickets.title'),
        description: t('metrics.totalTickets.description'),
        icon: Ticket,
        className: 'bg-primary-50 text-primary-600',
      },
      {
        key: 'openTickets',
        title: t('metrics.openTickets.title'),
        description: t('metrics.openTickets.description'),
        icon: CircleDot,
        className: 'bg-warning-50 text-warning-700',
      },
      {
        key: 'inProgressTickets',
        title: t('metrics.inProgressTickets.title'),
        description: t('metrics.inProgressTickets.description'),
        icon: Clock3,
        className: 'bg-info-50 text-info-700',
      },
      {
        key: 'closedTickets',
        title: t('metrics.closedTickets.title'),
        description: t('metrics.closedTickets.description'),
        icon: CheckCircle2,
        className: 'bg-success-50 text-success-700',
      },
    ],
    [t],
  );

  const secondaryMetrics = useMemo<SecondaryMetricDefinition[]>(
    () => [
      {
        key: 'waitingForUserTickets',
        label: t('secondaryMetrics.waitingForUserTickets'),
      },
      {
        key: 'unassignedTickets',
        label: t('secondaryMetrics.unassignedTickets'),
      },
      {
        key: 'needsReplyTickets',
        label: t('secondaryMetrics.needsReplyTickets'),
      },
      {
        key: 'overdueTickets',
        label: t('secondaryMetrics.overdueTickets'),
      },
    ],
    [t],
  );

  const retryOverview = () => {
    void overviewRequest.refetch().catch(() => undefined);
  };

  const retryTrend = () => {
    void trendRequest.refetch().catch(() => undefined);
  };

  return (
    <section className="flex flex-col gap-6">
      {overviewRequest.isError ? (
        <DashboardErrorState
          title={t('states.overviewErrorTitle')}
          errorMessage={tCommon(
            overviewRequest.error?.messageKey ?? 'errors.generic',
          )}
          retryLabel={t('actions.retry')}
          isRetrying={overviewRequest.isFetching}
          onRetry={retryOverview}
        />
      ) : overviewRequest.isLoading ? (
        <MetricsSkeleton />
      ) : overviewRequest.data ? (
        <OverviewMetrics
          cards={overviewRequest.data}
          primaryMetrics={primaryMetrics}
          secondaryMetrics={secondaryMetrics}
        />
      ) : (
        <DashboardEmptyState
          title={t('states.overviewEmptyTitle')}
          description={t('states.overviewEmptyDescription')}
        />
      )}

      <TrendCard
        trend={trendRequest.data}
        error={trendRequest.error}
        range={range}
        isLoading={trendRequest.isLoading}
        isRetrying={trendRequest.isFetching}
        onRangeChange={setRange}
        onRetry={retryTrend}
      />
    </section>
  );
};

export default DashboardOverviewClient;
