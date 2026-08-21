export type ReportRange = 'today' | 'week' | 'month' | 'year';

export type ReportGranularity = 'day' | 'week' | 'month';

export type ReportType =
  | 'generalTickets'
  | 'supportPerformance'
  | 'departmentStatistics'
  | 'responseTime';

export interface IReportCards {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  closedTickets: number;
}

export interface IReportTrendPoint {
  label: string;
  date: string;
  count: number;
}

export interface IReportTicketTrend {
  range: ReportRange | string;
  points: IReportTrendPoint[];
}

export interface IReportDepartmentStatistic {
  departmentId: string;
  departmentName: string;
  ticketCount: number;
  openTickets: number;
  closedTickets: number;
}

export interface IReportSupportPerformance {
  supportId: string;
  supportName: string;
  assignedTickets: number;
  closedTickets: number;
  averageResponseTimeMinutes: number;
}

export interface IGeneratedReport {
  fileName: string;
  mimeType: string;
  size: number;
  downloadHref: string | null;
  reportType: ReportType;
  generatedAt: string;
  sheetNames: string[];
}
