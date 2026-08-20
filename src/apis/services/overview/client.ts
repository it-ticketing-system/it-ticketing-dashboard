'use client';

import { clientApiRequest } from '@/apis/core/client/api-request';
import { createManagementOverviewServices } from './_services';

export const clientManagementOverviewServices =
  createManagementOverviewServices(clientApiRequest);

export type {
  GetManagementOverviewResponse,
  GetManagementOverviewTrendRequest,
  GetManagementOverviewTrendResponse,
  OverviewTrendRange,
} from './_types';
