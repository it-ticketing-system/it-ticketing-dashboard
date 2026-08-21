'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
} from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { DashboardEmptyState, DashboardErrorState } from './dashboard-states';
import { TrendSkeleton } from './skeleton/dashboard-overview-skeletons';
import TrendChart from './trend-chart';
import type { ApiException } from '@/apis/core/api-error';
import type { IOverviewTrend, OverviewTrendRange } from '@/models';

const RANGE_OPTIONS: OverviewTrendRange[] = ['today', 'week', 'month', 'year'];

type TrendCardProps = {
  trend: IOverviewTrend | null;
  error: ApiException | null;
  range: OverviewTrendRange;
  isLoading: boolean;
  isRetrying: boolean;
  onRangeChange: (range: OverviewTrendRange) => void;
  onRetry: () => void;
};

const TrendCard = ({
  trend,
  error,
  range,
  isLoading,
  isRetrying,
  onRangeChange,
  onRetry,
}: TrendCardProps) => {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const rangeLabels = useMemo<Record<OverviewTrendRange, string>>(
    () => ({
      today: t('ranges.today'),
      week: t('ranges.week'),
      month: t('ranges.month'),
      year: t('ranges.year'),
    }),
    [t],
  );

  return (
    <Card className="border-neutral-200/80 shadow-xs">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <CardTitle className="text-h3 text-neutral-900">
            {t('trend.title')}
          </CardTitle>
          <CardDescription className="text-body-sm mt-1 text-neutral-600">
            {t('trend.description')}
          </CardDescription>
        </div>

        <Tabs
          selectedKey={range}
          onSelectionChange={(key) => {
            onRangeChange(key as OverviewTrendRange);
          }}
          variant="secondary"
          aria-label={t('trend.rangeAriaLabel')}
          className="w-full sm:w-auto"
        >
          <Tabs.List className="grid w-full grid-cols-4 sm:w-auto">
            {RANGE_OPTIONS.map((option) => (
              <Tabs.Tab
                key={option}
                id={option}
                className="min-w-16 justify-center"
              >
                {rangeLabels[option]}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </CardHeader>

      <CardContent>
        {error ? (
          <DashboardErrorState
            title={t('states.trendErrorTitle')}
            errorMessage={tCommon(error.messageKey)}
            retryLabel={t('actions.retry')}
            isRetrying={isRetrying}
            onRetry={onRetry}
          />
        ) : isLoading ? (
          <TrendSkeleton />
        ) : trend ? (
          <TrendChart trend={trend} />
        ) : (
          <DashboardEmptyState
            title={t('states.trendEmptyTitle')}
            description={t('states.trendEmptyDescription')}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TrendCard;
