import type {
  IManagementOverviewCards,
  IOverviewTrend,
  OverviewTrendRange,
} from '@/models';

export type GetManagementOverviewResponse = IManagementOverviewCards;

export interface GetManagementOverviewTrendRequest {
  range: OverviewTrendRange;
}

export type GetManagementOverviewTrendResponse = IOverviewTrend;

export type { OverviewTrendRange };
