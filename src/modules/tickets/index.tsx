import { connection } from 'next/server';
import { Suspense } from 'react';
import TicketsClientFallback from './skeleton/tickets-client-fallback';
import TicketsClient from './tickets-client';
import { getTicketsInitialData } from './tickets.server';

type TicketsModuleProps = {
  searchParams: Promise<PageSearchParams>;
};

const TicketsModule = async ({ searchParams }: TicketsModuleProps) => {
  await connection();
  const ticketsInitialData = await getTicketsInitialData(await searchParams);

  return (
    <div>
      <Suspense fallback={<TicketsClientFallback />}>
        <TicketsClient {...ticketsInitialData} />
      </Suspense>
    </div>
  );
};

export default TicketsModule;
