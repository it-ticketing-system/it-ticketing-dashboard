'use client';

import { RoleGuard } from '@/components/shared';

const DepartmentsPage = () => {
  return (
    <RoleGuard adminOnly>
      <div className="flex items-center justify-center p-6">
        <h1 className="text-h2 text-neutral-900 font-bold">مدیریت دپارتمان‌ها</h1>
      </div>
    </RoleGuard>
  );
};

export default DepartmentsPage;
