'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ICON_SIZE_CLASS } from '@/constants';
import { DashboardEmptyState } from './dashboard-states';
import type { IOverviewTrend } from '@/models';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const numberFormatter = new Intl.NumberFormat('fa-IR');

const formatCount = (value: number): string => numberFormatter.format(value);

type TrendChartProps = {
  trend: IOverviewTrend;
};

const TrendChart = ({ trend }: TrendChartProps) => {
  const t = useTranslations('dashboard');
  const totalTrendTickets = trend.points.reduce(
    (total, point) => total + point.count,
    0,
  );

  const chartData = useMemo<ChartData<'line'>>(
    () => ({
      labels: trend.points.map((point) => point.label),
      datasets: [
        {
          label: t('trend.datasetLabel'),
          data: trend.points.map((point) => point.count),
          borderColor: '#2563eb',
          backgroundColor: 'rgb(37 99 235 / 12%)',
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2563eb',
          pointHoverRadius: 5,
          pointRadius: 3,
          borderWidth: 2,
          tension: 0.35,
          fill: true,
        },
      ],
    }),
    [t, trend.points],
  );

  const chartOptions = useMemo<ChartOptions<'line'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      locale: 'fa-IR',
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          rtl: true,
          textDirection: 'rtl',
          callbacks: {
            label: (context) =>
              `${t('trend.tooltipLabel')}: ${formatCount(context.parsed.y ?? 0)}`,
          },
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
            callback: (value) => formatCount(Number(value)),
          },
        },
      },
    }),
    [t],
  );

  if (trend.points.length === 0 || totalTrendTickets === 0) {
    return (
      <DashboardEmptyState
        title={t('states.trendEmptyTitle')}
        description={t('states.trendEmptyDescription')}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-primary-50 flex items-center justify-between gap-4 rounded-lg px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-primary-600 flex size-9 shrink-0 items-center justify-center rounded-lg bg-white">
            <BarChart3 aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          </span>
          <span className="text-body-sm text-primary-900">
            {t('trend.totalInRange')}
          </span>
        </div>
        <strong className="text-title text-primary-900 shrink-0">
          {formatCount(totalTrendTickets)}
        </strong>
      </div>

      <div className="h-72 min-h-72 w-full md:h-80 md:min-h-80">
        <Line
          data={chartData}
          options={chartOptions}
          role="img"
          aria-label={t('trend.chartAriaLabel')}
        />
      </div>
    </div>
  );
};

export default TrendChart;
