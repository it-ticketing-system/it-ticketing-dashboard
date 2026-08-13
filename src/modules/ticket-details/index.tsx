'use client';

import { clientTicketServices } from '@/apis/services/tickets/client';
import { QUERY_KEYS } from '@/constants';
import { useGetRequest } from '@/hooks';
import { TicketConversation } from './ticket-conversation';
import { TicketInfoCard } from './ticket-info';
import { OperationsCard } from './ticket-operations';
import type { TicketDetailsModuleProps } from './types';

const TicketDetailsModule = ({
  ticketId,
  initialData,
}: TicketDetailsModuleProps) => {
  const { data } = useGetRequest({
    queryKey: QUERY_KEYS.tickets.details(ticketId),
    requestFn: () => clientTicketServices.getTicketDetails(ticketId),
    initialData,
    showErrorToast: false,
    staleTime: 30_000,
  });

  const { ticket, messages } = data ?? initialData;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden lg:flex-row lg:gap-6">
      <div className="order-2 flex min-h-0 flex-1 flex-col gap-4 overflow-hidden lg:order-1 lg:gap-6">
        <TicketInfoCard ticket={ticket} />

        <TicketConversation
          ticketId={ticket.id}
          messages={messages}
          status={ticket.status}
          canReply={ticket.availableActions?.canReply}
        />
      </div>

      {ticket.availableActions && (
        <div className="order-1 flex shrink-0 flex-col items-end lg:order-2">
          <OperationsCard ticket={ticket} />
        </div>
      )}
    </div>
  );
};

export default TicketDetailsModule;
