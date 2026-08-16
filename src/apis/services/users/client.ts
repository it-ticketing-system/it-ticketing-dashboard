import { clientApiPaginatedRequest } from '@/apis/core/client/api-request';
import { createUserServices } from './_services';

export const clientUserServices = createUserServices(clientApiPaginatedRequest);
