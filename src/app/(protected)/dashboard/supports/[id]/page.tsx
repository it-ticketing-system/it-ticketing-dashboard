import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { RoleGuard } from '@/components/shared';
import { SupportManageModule } from '@/modules';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('supports.editMeta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const EditSupportPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const supportId = Number(resolvedParams.id);

  if (isNaN(supportId)) {
    notFound();
  }

  return (
    <RoleGuard adminOnly>
        <SupportManageModule mode="edit" supportId={supportId} />
    </RoleGuard>
  );
};

export default EditSupportPage;
