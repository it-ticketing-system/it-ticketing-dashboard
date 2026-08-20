export type OverviewTrendRangeDto = 'today' | 'week' | 'month' | 'year';

export interface ManagementOverviewCardsDto {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  waitingForUserTickets: number;
  closedTickets: number;
  unassignedTickets: number;
  needsReplyTickets: number;
  overdueTickets: number;
}

export interface GetManagementOverviewResponseDto {
  cards: ManagementOverviewCardsDto;
}

export interface OverviewTrendPointDto {
  label: string;
  date: string;
  count: number;
}

export interface GetManagementOverviewTrendResponseDto {
  range: OverviewTrendRangeDto;
  points: OverviewTrendPointDto[];
}
