import { serverApiPaginatedRequest } from '@/apis/core/server/api-request';
import { createUserServices } from './_services';

export const serverUserServices = createUserServices(serverApiPaginatedRequest);
