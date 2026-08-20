import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DashboardOverviewModule } from '@/modules';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard.meta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const DashboardPage = () => {
  return <DashboardOverviewModule />;
};

export default DashboardPage;
