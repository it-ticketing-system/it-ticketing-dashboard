import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { RoleGuard } from '@/components/shared';
import { DepartmentManageModule } from '@/modules';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('departments.addMeta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const AddDepartmentPage = () => {
  return (
    <RoleGuard adminOnly>
      <DepartmentManageModule mode="add" />
    </RoleGuard>
  );
};

export default AddDepartmentPage;
