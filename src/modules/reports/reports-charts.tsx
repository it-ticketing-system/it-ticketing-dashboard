'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { ChartPanel } from '@/components/shared';
import type { ApiException } from '@/apis/core/api-error';
import type {
  IReportDepartmentStatistic,
  IReportSupportPerformance,
  IReportTicketTrend,
} from '@/models';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
);

const numberFormatter = new Intl.NumberFormat('fa-IR');
const EMPTY_TREND_POINTS: IReportTicketTrend['points'] = [];
const EMPTY_DEPARTMENT_STATISTICS: IReportDepartmentStatistic[] = [];
const EMPTY_SUPPORT_PERFORMANCE: IReportSupportPerformance[] = [];

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  locale: 'fa-IR',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      rtl: true,
      textDirection: 'rtl' as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#64748b',
        font: {
          family: 'Vazirmatn, sans-serif',
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgb(226 232 240 / 70%)',
      },
      ticks: {
        precision: 0,
        color: '#64748b',
        font: {
          family: 'Vazirmatn, sans-serif',
          size: 12,
        },
        callback: (value: string | number) =>
          numberFormatter.format(Number(value)),
      },
    },
  },
};

type ReportChartRequestState = {
  error: ApiException | null;
  isLoading: boolean;
  isRetrying: boolean;
  onRetry: () => void;
};

type TicketTrendChartProps = ReportChartRequestState & {
  trend: IReportTicketTrend | null;
};

export const TicketTrendChart = ({
  trend,
  error,
  isLoading,
  isRetrying,
  onRetry,
}: TicketTrendChartProps) => {
  const t = useTranslations('reports');
  const tCommon = useTranslations('common');
  const points = trend?.points ?? EMPTY_TREND_POINTS;
  const chartData = useMemo<ChartData<'line'>>(
    () => ({
      labels: points.map((point) => point.label),
      datasets: [
        {
          label: t('charts.ticketTrend.datasetLabel'),
          data: points.map((point) => point.count),
          borderColor: '#2563eb',
          backgroundColor: 'rgb(37 99 235 / 12%)',
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2563eb',
          borderWidth: 2,
          tension: 0.35,
          fill: false,
        },
      ],
    }),
    [points, t],
  );

  return (
    <ChartPanel
      title={t('charts.ticketTrend.title')}
      description={t('charts.ticketTrend.description')}
      error={error}
      errorMessage={error ? tCommon(error.messageKey) : undefined}
      emptyTitle={t('states.chartEmptyTitle')}
      emptyDescription={t('states.chartEmptyDescription')}
      isEmpty={points.length === 0}
      isLoading={isLoading}
      isRetrying={isRetrying}
      onRetry={onRetry}
    >
      <Line
        data={chartData}
        options={baseOptions as ChartOptions<'line'>}
        role="img"
        aria-label={t('charts.ticketTrend.ariaLabel')}
      />
    </ChartPanel>
  );
};

type DepartmentChartProps = ReportChartRequestState & {
  items: IReportDepartmentStatistic[] | null;
};

export const DepartmentStatisticsChart = ({
  items,
  error,
  isLoading,
  isRetrying,
  onRetry,
}: DepartmentChartProps) => {
  const t = useTranslations('reports');
  const tCommon = useTranslations('common');
  const statistics = items ?? EMPTY_DEPARTMENT_STATISTICS;
  const chartData = useMemo<ChartData<'bar'>>(
    () => ({
      labels: statistics.map((item) => item.departmentName),
      datasets: [
        {
          label: t('charts.departmentStatistics.datasetLabel'),
          data: statistics.map((item) => item.ticketCount),
          backgroundColor: '#2563eb',
          borderRadius: 8,
        },
      ],
    }),
    [statistics, t],
  );

  return (
    <ChartPanel
      title={t('charts.departmentStatistics.title')}
      description={t('charts.departmentStatistics.description')}
      error={error}
      errorMessage={error ? tCommon(error.messageKey) : undefined}
      emptyTitle={t('states.chartEmptyTitle')}
      emptyDescription={t('states.chartEmptyDescription')}
      isEmpty={statistics.length === 0}
      isLoading={isLoading}
      isRetrying={isRetrying}
      onRetry={onRetry}
    >
      <Bar
        data={chartData}
        options={baseOptions as ChartOptions<'bar'>}
        role="img"
        aria-label={t('charts.departmentStatistics.ariaLabel')}
      />
    </ChartPanel>
  );
};

type SupportChartProps = ReportChartRequestState & {
  items: IReportSupportPerformance[] | null;
};

export const SupportPerformanceChart = ({
  items,
  error,
  isLoading,
  isRetrying,
  onRetry,
}: SupportChartProps) => {
  const t = useTranslations('reports');
  const tCommon = useTranslations('common');
  const performance = items ?? EMPTY_SUPPORT_PERFORMANCE;
  const chartData = useMemo<ChartData<'bar'>>(
    () => ({
      labels: performance.map((item) => item.supportName),
      datasets: [
        {
          label: t('charts.supportPerformance.datasetLabel'),
          data: performance.map((item) => item.closedTickets),
          backgroundColor: '#10b981',
          borderRadius: 8,
        },
      ],
    }),
    [performance, t],
  );

  return (
    <ChartPanel
      title={t('charts.supportPerformance.title')}
      description={t('charts.supportPerformance.description')}
      error={error}
      errorMessage={error ? tCommon(error.messageKey) : undefined}
      emptyTitle={t('states.chartEmptyTitle')}
      emptyDescription={t('states.chartEmptyDescription')}
      isEmpty={performance.length === 0}
      isLoading={isLoading}
      isRetrying={isRetrying}
      onRetry={onRetry}
    >
      <Bar
        data={chartData}
        options={baseOptions as ChartOptions<'bar'>}
        role="img"
        aria-label={t('charts.supportPerformance.ariaLabel')}
      />
    </ChartPanel>
  );
};
