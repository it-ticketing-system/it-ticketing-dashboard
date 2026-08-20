import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { serverSupportServices } from '@/apis/services/supports/server';
import SupportManageClientFallback from './skeleton/support-manage-client-fallback';
import SupportManageClient from './support-manage-client';

type SupportManageModuleProps = {
  mode: 'add' | 'edit';
  supportId?: number;
};

const SupportManageModule = async ({ mode, supportId }: SupportManageModuleProps) => {
  let initialData = undefined;

  if (mode === 'edit' && supportId) {
    await connection();
    try {
      initialData = await serverSupportServices.getSupport(supportId);
    } catch {
      notFound();
    }
  }

  return (
    <Suspense fallback={<SupportManageClientFallback />}>
      <SupportManageClient mode={mode} initialData={initialData} />
    </Suspense>
  );
};

export default SupportManageModule;
