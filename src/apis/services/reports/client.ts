'use client';

import { clientApiRequest } from '@/apis/core/client/api-request';
import { createReportServices } from './_services';

export const clientReportServices = createReportServices(clientApiRequest);

export type {
  ExportReportRequest,
  ExportReportResult,
  GetReportsDashboardRequest,
} from './_types';
