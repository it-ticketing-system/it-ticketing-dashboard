import { serverApiRequest, serverApiPaginatedRequest } from '@/apis/core/server/api-request';
import { createDepartmentServices } from './_services';

export const serverDepartmentServices = createDepartmentServices(
  serverApiRequest,
  serverApiPaginatedRequest,
);
