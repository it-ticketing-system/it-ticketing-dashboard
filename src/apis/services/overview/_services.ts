import { MANAGEMENT_OVERVIEW_ENDPOINTS } from './_endpoints';
import { toManagementOverview, toOverviewTrend } from './_mappers';
import type {
  GetManagementOverviewResponseDto,
  GetManagementOverviewTrendResponseDto,
} from './_dto';
import type {
  GetManagementOverviewResponse,
  GetManagementOverviewTrendRequest,
  GetManagementOverviewTrendResponse,
} from './_types';
import type { ApiRequestFunction } from '@/apis/core/types/api-request.types';

export function createManagementOverviewServices(request: ApiRequestFunction) {
  async function getOverview(
    signal?: AbortSignal,
  ): Promise<GetManagementOverviewResponse> {
    const response = await request<GetManagementOverviewResponseDto>({
      url: MANAGEMENT_OVERVIEW_ENDPOINTS.overview,
      method: 'GET',
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toManagementOverview(response);
  }

  async function getOverviewTrend(
    { range }: GetManagementOverviewTrendRequest,
    signal?: AbortSignal,
  ): Promise<GetManagementOverviewTrendResponse> {
    const response = await request<GetManagementOverviewTrendResponseDto>({
      url: MANAGEMENT_OVERVIEW_ENDPOINTS.trend,
      method: 'GET',
      params: {
        range,
      },
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toOverviewTrend(response);
  }

  return {
    getOverview,
    getOverviewTrend,
  };
}
