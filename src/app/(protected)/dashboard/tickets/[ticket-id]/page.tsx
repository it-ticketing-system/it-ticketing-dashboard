import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TicketDetailsModule } from '@/modules';

type TicketDetailsPageProps = {
  params: Promise<{
    'ticket-id': string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ticketDetails.meta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const TicketDetailsPage = async ({ params }: TicketDetailsPageProps) => {
  const { 'ticket-id': rawTicketId } = await params;

  return (
    <TicketDetailsModule ticketId={rawTicketId} />
  );
};

export default TicketDetailsPage;
