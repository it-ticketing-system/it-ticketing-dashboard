import { useTranslations } from 'next-intl';
import { TicketStatusChip } from '@/components/shared';
import { cn } from '@/utils';
import type { TicketDetails } from '../types';
import type { ReactNode } from 'react';

interface TicketInfoCardProps {
  ticket: TicketDetails;
}

interface InfoItemProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const InfoItem = ({ label, children, className }: InfoItemProps) => {
  return (
    <div
      className={cn(
        'border-separator flex min-h-11 items-center justify-between gap-4 border-b py-2 last:border-b-0 lg:block lg:min-h-0 lg:border-b-0 lg:px-5 lg:py-0',
        className,
      )}
    >
      <p className="text-body-sm text-muted lg:mb-2">{label}</p>

      <div className="text-body-sm text-foreground min-w-0 font-medium">
        {children}
      </div>
    </div>
  );
};

const TicketInfoCard = ({ ticket }: TicketInfoCardProps) => {
  const t = useTranslations('ticketDetails');
  const tStatuses = useTranslations('common.statuses');

  return (
    <section
      aria-label={t('information.ariaLabel')}
      className="border-border bg-surface shrink-0 rounded-xl border p-4 shadow-sm lg:p-0"
    >
      <div className="lg:overflow-x-auto lg:p-6">
        <div className="lg:grid lg:min-w-max lg:grid-cols-[150px_minmax(240px,1.6fr)_160px_180px_180px] lg:items-start lg:divide-x-0">
          <InfoItem label={t('information.ticketNumber')}>
            <span
              dir="ltr"
              className="font-latin inline-block whitespace-nowrap"
            >
              {ticket.ticketNumber}
            </span>
          </InfoItem>

          <InfoItem
            label={t('information.title')}
            className="lg:border-separator lg:border-s lg:ps-5"
          >
            <span className="block truncate">{ticket.title}</span>
          </InfoItem>

          <InfoItem
            label={t('information.status')}
            className="lg:border-separator lg:border-s lg:ps-5"
          >
            <TicketStatusChip
              status={ticket.status}
              label={tStatuses(ticket.status)}
            />
          </InfoItem>

          <InfoItem
            label={t('information.createdAt')}
            className="lg:border-separator lg:border-s lg:ps-5"
          >
            <span dir="ltr" className="inline-block whitespace-nowrap">
              {ticket.createdAtLabel}
            </span>
          </InfoItem>

          <InfoItem
            label={t('information.lastUpdated')}
            className="lg:border-separator lg:border-s lg:ps-5"
          >
            <span dir="ltr" className="inline-block whitespace-nowrap">
              {ticket.lastUpdatedLabel}
            </span>
          </InfoItem>
        </div>
      </div>
    </section>
  );
};

export default TicketInfoCard;
