'use client';

import { Card, CardContent, Skeleton } from '@heroui/react';
import { CheckCircle2, CircleDot, Clock3, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';
import type { IReportCards } from '@/models';

const numberFormatter = new Intl.NumberFormat('fa-IR');

type ReportSummaryCardsProps = {
  cards: IReportCards | null;
  isLoading: boolean;
};

const ReportSummaryCards = ({ cards, isLoading }: ReportSummaryCardsProps) => {
  const t = useTranslations('reports');
  const metrics = [
    {
      key: 'totalTickets',
      value: cards?.totalTickets ?? 0,
      icon: Ticket,
      className: 'bg-primary-50 text-primary-600',
    },
    {
      key: 'openTickets',
      value: cards?.openTickets ?? 0,
      icon: CircleDot,
      className: 'bg-warning-50 text-warning-700',
    },
    {
      key: 'inProgressTickets',
      value: cards?.inProgressTickets ?? 0,
      icon: Clock3,
      className: 'bg-info-50 text-info-700',
    },
    {
      key: 'closedTickets',
      value: cards?.closedTickets ?? 0,
      icon: CheckCircle2,
      className: 'bg-success-50 text-success-700',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card key={metric.key} className="border-neutral-200/80 shadow-xs">
            <CardContent className="flex min-h-32 flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-body-sm text-neutral-600">
                    {t(`summary.${metric.key}.title`)}
                  </p>
                  <p className="text-caption text-neutral-500 mt-1">
                    {t(`summary.${metric.key}.description`)}
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
              {isLoading ? (
                <Skeleton className="h-9 w-20 rounded-md" />
              ) : (
                <strong className="text-h2 text-neutral-900">
                  {numberFormatter.format(metric.value)}
                </strong>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReportSummaryCards;
