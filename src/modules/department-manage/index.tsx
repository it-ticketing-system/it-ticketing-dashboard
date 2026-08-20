import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { serverDepartmentServices } from '@/apis/services/departments/server';
import { serverLookupServices } from '@/apis/services/lookups/server';
import DepartmentManageClient from './department-manage-client';
import DepartmentManageClientFallback from './skeleton/department-manage-client-fallback';
import type { IDepartmentListItem } from '@/models';

type DepartmentManageModuleProps = {
  mode: 'add' | 'edit';
  departmentId?: number;
};

const DepartmentManageModule = async ({ mode, departmentId }: DepartmentManageModuleProps) => {
  let initialData = undefined;

  if (mode === 'edit' && departmentId) {
    await connection();
    try {
      // Since there is no GET /management/departments/{id}, we find it in the list
      const response = await serverDepartmentServices.getDepartments({ perPage: 100 });
      const departmentListItem = response.items.find((d: IDepartmentListItem) => d.id === departmentId);
      
      if (!departmentListItem) {
        notFound();
      }

      // We use the lookups API to get supports for this department
      const supports = await serverLookupServices.getSupports({ departmentId: String(departmentId) });
      
      initialData = {
        id: departmentListItem.id,
        name: departmentListItem.name,
        supports: supports.map(s => ({ id: Number(s.id), name: s.name })),
      };
    } catch {
      notFound();
    }
  }

  return (
    <Suspense fallback={<DepartmentManageClientFallback />}>
      <DepartmentManageClient mode={mode} initialData={initialData} />
    </Suspense>
  );
};

export default DepartmentManageModule;
