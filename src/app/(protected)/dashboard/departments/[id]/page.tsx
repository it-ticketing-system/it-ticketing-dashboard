import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { RoleGuard } from '@/components/shared';
import { DepartmentManageModule } from '@/modules';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('departments.editMeta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const EditDepartmentPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const departmentId = Number(resolvedParams.id);

  if (isNaN(departmentId)) {
    notFound();
  }

  return (
    <RoleGuard adminOnly>
      <DepartmentManageModule mode="edit" departmentId={departmentId} />
    </RoleGuard>
  );
};

export default EditDepartmentPage;
