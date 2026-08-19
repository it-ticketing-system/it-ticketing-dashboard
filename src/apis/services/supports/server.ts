import { serverApiRequest, serverApiPaginatedRequest } from '@/apis/core/server/api-request';
import { createSupportServices } from './_services';

export const serverSupportServices = createSupportServices(
  serverApiRequest,
  serverApiPaginatedRequest,
);
