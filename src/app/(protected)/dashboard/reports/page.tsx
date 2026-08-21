import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReportsModule } from '@/modules';

type ReportsPageProps = {
  searchParams: Promise<PageSearchParams>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('reports.meta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const ReportsPage = ({ searchParams }: ReportsPageProps) => {
  return <ReportsModule searchParams={searchParams} />;
};

export default ReportsPage;
