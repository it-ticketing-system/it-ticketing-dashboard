import { clientApiRequest, clientApiPaginatedRequest } from '@/apis/core/client/api-request';
import { createSupportServices } from './_services';

export const clientSupportServices = createSupportServices(
  clientApiRequest,
  clientApiPaginatedRequest,
);
