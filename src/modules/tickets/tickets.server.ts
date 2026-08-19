import 'server-only';

import { toApiRequestError, type ApiRequestError } from '@/apis/core/api-error';
import { serverTicketServices } from '@/apis/services/tickets/server';
import { TicketTableData } from './ticket-table/types';
import {
  createEmptyTickets,
  createTicketsParams,
  parseTicketFilters,
} from './tickets-query';

type TicketsInitialData = {
  initialFilters: ReturnType<typeof parseTicketFilters>;
  initialTickets: TicketTableData;
  initialTicketsError: ApiRequestError | null;
};

export const getTicketsInitialData = async (
  searchParams: PageSearchParams,
): Promise<TicketsInitialData> => {
  const initialFilters = parseTicketFilters(searchParams);
  const ticketsParams = createTicketsParams(initialFilters);

  const [ticketsResult] = await Promise.allSettled([
    serverTicketServices.getTickets(ticketsParams),
  ]);
  const initialTickets: TicketTableData =
    ticketsResult.status === 'fulfilled'
      ? ticketsResult.value
      : createEmptyTickets(initialFilters.page);
  const initialTicketsError =
    ticketsResult.status === 'rejected'
      ? toApiRequestError(ticketsResult.reason)
      : null;

  return {
    initialFilters,
    initialTickets,
    initialTicketsError,
  };
};
