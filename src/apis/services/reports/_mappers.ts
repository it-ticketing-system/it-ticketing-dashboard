import { toSafeBackendProxyHref } from '@/utils';
import type {
  ExportReportRequestDto,
  ExportReportResponseDto,
  GetReportCardsResponseDto,
  GetReportDepartmentStatisticsResponseDto,
  GetReportSupportPerformanceResponseDto,
  GetReportTicketTrendResponseDto,
  GetReportsDashboardRequestDto,
  ReportTypeDto,
} from './_dto';
import type {
  ExportReportRequest,
  GetReportsDashboardRequest,
} from './_types';
import type {
  IGeneratedReport,
  IReportCards,
  IReportDepartmentStatistic,
  IReportSupportPerformance,
  IReportTicketTrend,
  ReportType,
} from '@/models';

const REPORT_TYPE_DTO_MAP = {
  generalTickets: 'GENERAL_TICKETS',
  supportPerformance: 'SUPPORT_PERFORMANCE',
  departmentStatistics: 'DEPARTMENT_STATISTICS',
  responseTime: 'RESPONSE_TIME',
} as const satisfies Record<ReportType, ReportTypeDto>;

const REPORT_TYPE_MAP = {
  GENERAL_TICKETS: 'generalTickets',
  SUPPORT_PERFORMANCE: 'supportPerformance',
  DEPARTMENT_STATISTICS: 'departmentStatistics',
  RESPONSE_TIME: 'responseTime',
} as const satisfies Record<ReportTypeDto, ReportType>;

const toOptionalNumber = (value?: string): number | undefined => {
  if (!value) {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
};

export const toGetReportsDashboardRequestDto = (
  params: GetReportsDashboardRequest,
): GetReportsDashboardRequestDto => ({
  dateFrom: params.dateFrom,
  dateTo: params.dateTo,
  departmentId: toOptionalNumber(params.departmentId),
  supportId: toOptionalNumber(params.supportId),
  granularity: params.granularity,
});

export const toExportReportRequestDto = (
  payload: ExportReportRequest,
): ExportReportRequestDto => ({
  ...toGetReportsDashboardRequestDto(payload),
  reportType: REPORT_TYPE_DTO_MAP[payload.reportType],
});

export const toReportCards = (
  response: GetReportCardsResponseDto,
): IReportCards => ({
  totalTickets: response.cards.totalTickets,
  openTickets: response.cards.openTickets,
  inProgressTickets: response.cards.inProgressTickets,
  closedTickets: response.cards.closedTickets,
});

export const toReportTicketTrend = (
  response: GetReportTicketTrendResponseDto,
): IReportTicketTrend => ({
  range: response.ticketTrend.range,
  points: response.ticketTrend.points.map((point) => ({
    label: point.label,
    date: point.date,
    count: point.count,
  })),
});

export const toReportDepartmentStatistics = (
  response: GetReportDepartmentStatisticsResponseDto,
): IReportDepartmentStatistic[] =>
  response.departmentStatistics.map((item) => ({
    departmentId: String(item.department.id),
    departmentName: item.department.name,
    ticketCount: item.ticketCount,
    openTickets: item.openTickets,
    closedTickets: item.closedTickets,
  }));

export const toReportSupportPerformance = (
  response: GetReportSupportPerformanceResponseDto,
): IReportSupportPerformance[] =>
  response.supportPerformance.map((item) => ({
    supportId: String(item.support.id),
    supportName: item.support.name,
    assignedTickets: item.assignedTickets,
    closedTickets: item.closedTickets,
    averageResponseTimeMinutes: item.averageResponseTimeMinutes,
  }));

export const toGeneratedReport = (
  response: ExportReportResponseDto,
): IGeneratedReport => ({
  fileName: response.fileName,
  mimeType: response.mimeType,
  size: response.size,
  downloadHref: toSafeBackendProxyHref(response.downloadUrl),
  reportType: REPORT_TYPE_MAP[response.reportType],
  generatedAt: response.generatedAt,
  sheetNames: response.sheetNames,
});
