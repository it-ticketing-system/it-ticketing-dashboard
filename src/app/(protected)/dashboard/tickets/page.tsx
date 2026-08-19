import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TicketsModule } from '@/modules';

type TicketsPageProps = {
  searchParams: Promise<PageSearchParams>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tickets.meta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const TicketsPage = ({ searchParams }: TicketsPageProps) => {
  return <TicketsModule searchParams={searchParams} />;
};

export default TicketsPage;
