import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { RoleGuard } from '@/components/shared';
import { SupportManageModule } from '@/modules';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('supports.addMeta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const AddSupportPage = () => {
  return (
    <RoleGuard adminOnly>
        <SupportManageModule mode="add" />
    </RoleGuard>
  );
};

export default AddSupportPage;
