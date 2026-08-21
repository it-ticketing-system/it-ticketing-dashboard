import { ApiRequestFunction } from '@/apis/core/types/api-request.types';
import { REPORT_ENDPOINTS } from './_endpoints';
import {
  toExportReportRequestDto,
  toGeneratedReport,
  toGetReportsDashboardRequestDto,
  toReportCards,
  toReportDepartmentStatistics,
  toReportSupportPerformance,
  toReportTicketTrend,
} from './_mappers';
import type {
  ExportReportRequestDto,
  ExportReportResponseDto,
  GetReportCardsResponseDto,
  GetReportDepartmentStatisticsResponseDto,
  GetReportSupportPerformanceResponseDto,
  GetReportTicketTrendResponseDto,
  GetReportsDashboardRequestDto,
} from './_dto';
import type {
  ExportReportRequest,
  ExportReportResult,
  GetReportCardsResponse,
  GetReportDepartmentStatisticsResponse,
  GetReportSupportPerformanceResponse,
  GetReportTicketTrendResponse,
  GetReportsDashboardRequest,
} from './_types';

export function createReportServices(request: ApiRequestFunction) {
  async function getCards(
    params: GetReportsDashboardRequest,
    signal?: AbortSignal,
  ): Promise<GetReportCardsResponse> {
    const response = await request<
      GetReportCardsResponseDto,
      GetReportsDashboardRequestDto
    >({
      url: REPORT_ENDPOINTS.cards,
      method: 'GET',
      params: toGetReportsDashboardRequestDto(params),
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toReportCards(response);
  }

  async function getTicketTrend(
    params: GetReportsDashboardRequest,
    signal?: AbortSignal,
  ): Promise<GetReportTicketTrendResponse> {
    const response = await request<
      GetReportTicketTrendResponseDto,
      GetReportsDashboardRequestDto
    >({
      url: REPORT_ENDPOINTS.ticketTrend,
      method: 'GET',
      params: toGetReportsDashboardRequestDto(params),
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toReportTicketTrend(response);
  }

  async function getDepartmentStatistics(
    params: GetReportsDashboardRequest,
    signal?: AbortSignal,
  ): Promise<GetReportDepartmentStatisticsResponse> {
    const response = await request<
      GetReportDepartmentStatisticsResponseDto,
      GetReportsDashboardRequestDto
    >({
      url: REPORT_ENDPOINTS.departmentStatistics,
      method: 'GET',
      params: toGetReportsDashboardRequestDto(params),
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toReportDepartmentStatistics(response);
  }

  async function getSupportPerformance(
    params: GetReportsDashboardRequest,
    signal?: AbortSignal,
  ): Promise<GetReportSupportPerformanceResponse> {
    const response = await request<
      GetReportSupportPerformanceResponseDto,
      GetReportsDashboardRequestDto
    >({
      url: REPORT_ENDPOINTS.supportPerformance,
      method: 'GET',
      params: toGetReportsDashboardRequestDto(params),
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toReportSupportPerformance(response);
  }

  async function exportReport(
    payload: ExportReportRequest,
  ): Promise<ExportReportResult> {
    const response = await request<ExportReportResponseDto, ExportReportRequestDto>({
      url: REPORT_ENDPOINTS.export,
      method: 'POST',
      data: toExportReportRequestDto(payload),
      meta: {
        auth: 'required',
      },
    });

    return toGeneratedReport(response);
  }

  return {
    getCards,
    getTicketTrend,
    getDepartmentStatistics,
    getSupportPerformance,
    exportReport,
  };
}
