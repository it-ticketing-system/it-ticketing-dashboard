import type {
  IGeneratedReport,
  IReportCards,
  IReportDepartmentStatistic,
  IReportSupportPerformance,
  IReportTicketTrend,
  ReportGranularity,
  ReportType,
} from '@/models';

export interface GetReportsDashboardRequest {
  dateFrom?: string;
  dateTo?: string;
  departmentId?: string;
  supportId?: string;
  granularity?: ReportGranularity;
}

export interface ExportReportRequest extends GetReportsDashboardRequest {
  reportType: ReportType;
}

export type GetReportCardsResponse = IReportCards;
export type GetReportTicketTrendResponse = IReportTicketTrend;
export type GetReportDepartmentStatisticsResponse =
  IReportDepartmentStatistic[];
export type GetReportSupportPerformanceResponse = IReportSupportPerformance[];
export type ExportReportResult = IGeneratedReport;
