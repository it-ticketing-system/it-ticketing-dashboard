import { Card, CardContent } from '@heroui/react';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';
import type {
  PrimaryMetricDefinition,
  SecondaryMetricDefinition,
} from './types';
import type { IManagementOverviewCards } from '@/models';

const numberFormatter = new Intl.NumberFormat('fa-IR');

const formatCount = (value: number): string => numberFormatter.format(value);

type OverviewMetricsProps = {
  cards: IManagementOverviewCards;
  primaryMetrics: PrimaryMetricDefinition[];
  secondaryMetrics: SecondaryMetricDefinition[];
};

const OverviewMetrics = ({
  cards,
  primaryMetrics,
  secondaryMetrics,
}: OverviewMetricsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {primaryMetrics.map((metric) => (
          <MetricCard
            key={metric.key}
            metric={metric}
            value={cards[metric.key]}
          />
        ))}
      </div>

      <Card className="border-neutral-200/80 shadow-xs">
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {secondaryMetrics.map((metric) => (
            <div
              key={metric.key}
              className="flex min-h-16 items-center justify-between gap-3 rounded-lg bg-neutral-50 px-4 py-3"
            >
              <span className="text-body-sm text-neutral-600">
                {metric.label}
              </span>
              <strong className="text-title text-neutral-900">
                {formatCount(cards[metric.key])}
              </strong>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

type MetricCardProps = {
  metric: PrimaryMetricDefinition;
  value: number;
};

const MetricCard = ({ metric, value }: MetricCardProps) => {
  const Icon = metric.icon;

  return (
    <Card className="border-neutral-200/80 shadow-xs">
      <CardContent className="flex min-h-36 flex-col justify-between gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-body-sm text-neutral-600">{metric.title}</p>
            <p className="text-caption mt-1 text-neutral-500">
              {metric.description}
            </p>
          </div>

          <span
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl',
              metric.className,
            )}
          >
            <Icon aria-hidden="true" className={ICON_SIZE_CLASS.md} />
          </span>
        </div>

        <strong className="text-h1 text-neutral-900">
          {formatCount(value)}
        </strong>
      </CardContent>
    </Card>
  );
};

export default OverviewMetrics;
