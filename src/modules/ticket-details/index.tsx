import { Suspense } from 'react';
import { connection } from 'next/server';
import TicketDetailsClientFallback from './skeleton/ticket-details-client-fallback';
import TicketDetailsClient from './ticket-details-client';
import { getTicketDetailsInitialData } from './ticket-details.server';

type TicketDetailsModuleProps = {
  ticketId: string;
};

const TicketDetailsModule = async ({ ticketId }: TicketDetailsModuleProps) => {
  await connection();
  const ticketDetails = await getTicketDetailsInitialData(ticketId);

  return (
    <Suspense fallback={<TicketDetailsClientFallback />}>
      <TicketDetailsClient ticketId={ticketId} initialData={ticketDetails} />
    </Suspense>
  );
};

export default TicketDetailsModule;
