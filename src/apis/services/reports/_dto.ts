export type ReportTypeDto =
  | 'GENERAL_TICKETS'
  | 'SUPPORT_PERFORMANCE'
  | 'DEPARTMENT_STATISTICS'
  | 'RESPONSE_TIME';

export type ReportGranularityDto = 'day' | 'week' | 'month';

export interface GetReportsDashboardRequestDto {
  dateFrom?: string;
  dateTo?: string;
  departmentId?: number;
  supportId?: number;
  granularity?: ReportGranularityDto;
}

export interface ExportReportRequestDto extends GetReportsDashboardRequestDto {
  reportType: ReportTypeDto;
}

export interface ReportCardsDto {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  closedTickets: number;
}

export interface GetReportCardsResponseDto {
  cards: ReportCardsDto;
}

export interface ReportTrendPointDto {
  label: string;
  date: string;
  count: number;
}

export interface GetReportTicketTrendResponseDto {
  ticketTrend: {
    range: string;
    points: ReportTrendPointDto[];
  };
}

export interface ReportDepartmentStatisticDto {
  department: {
    id: number;
    name: string;
  };
  ticketCount: number;
  openTickets: number;
  closedTickets: number;
}

export interface GetReportDepartmentStatisticsResponseDto {
  departmentStatistics: ReportDepartmentStatisticDto[];
}

export interface ReportSupportPerformanceDto {
  support: {
    id: number;
    name: string;
  };
  assignedTickets: number;
  closedTickets: number;
  averageResponseTimeMinutes: number;
}

export interface GetReportSupportPerformanceResponseDto {
  supportPerformance: ReportSupportPerformanceDto[];
}

export interface ExportReportResponseDto {
  fileName: string;
  mimeType: string;
  size: number;
  downloadUrl: string;
  reportType: ReportTypeDto;
  generatedAt: string;
  sheetNames: string[];
}
