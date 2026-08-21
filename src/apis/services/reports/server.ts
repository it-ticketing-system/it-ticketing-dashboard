import 'server-only';

import { serverApiRequest } from '@/apis/core/server/api-request';
import { createReportServices } from './_services';

export const serverReportServices = createReportServices(serverApiRequest);
