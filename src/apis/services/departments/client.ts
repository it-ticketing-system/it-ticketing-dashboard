import { clientApiRequest, clientApiPaginatedRequest } from '@/apis/core/client/api-request';
import { createDepartmentServices } from './_services';

export const clientDepartmentServices = createDepartmentServices(
  clientApiRequest,
  clientApiPaginatedRequest,
);
