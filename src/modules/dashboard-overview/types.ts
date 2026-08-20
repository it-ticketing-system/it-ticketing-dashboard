import type { IManagementOverviewCards } from '@/models';
import type { ComponentType } from 'react';

export type PrimaryMetricDefinition = {
  key: keyof Pick<
    IManagementOverviewCards,
    'totalTickets' | 'openTickets' | 'inProgressTickets' | 'closedTickets'
  >;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  className: string;
};

export type SecondaryMetricDefinition = {
  key: keyof Pick<
    IManagementOverviewCards,
    | 'waitingForUserTickets'
    | 'unassignedTickets'
    | 'needsReplyTickets'
    | 'overdueTickets'
  >;
  label: string;
};
