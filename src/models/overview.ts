export type OverviewTrendRange = 'today' | 'week' | 'month' | 'year';

export interface IManagementOverviewCards {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  waitingForUserTickets: number;
  closedTickets: number;
  unassignedTickets: number;
  needsReplyTickets: number;
  overdueTickets: number;
}

export interface IOverviewTrendPoint {
  label: string;
  date: string;
  count: number;
}

export interface IOverviewTrend {
  range: OverviewTrendRange;
  points: IOverviewTrendPoint[];
}
