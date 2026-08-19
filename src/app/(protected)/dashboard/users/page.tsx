import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { RoleGuard } from '@/components/shared';
import { UsersModule } from '@/modules';

type UsersPageProps = {
  searchParams: Promise<PageSearchParams>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('users.meta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const UsersPage = ({ searchParams }: UsersPageProps) => {
  return (
    <RoleGuard adminOnly>
        <UsersModule searchParams={searchParams} />
    </RoleGuard>
  );
};

export default UsersPage;
