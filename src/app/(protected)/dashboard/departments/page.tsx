'use client';

import { RoleGuard } from '@/components/shared';

const DepartmentsPage = () => {
  return (
    <RoleGuard adminOnly>
      <div className="flex items-center justify-center p-6">
        <h1 className="text-h2 font-bold text-neutral-900">
          مدیریت دپارتمان‌ها
        </h1>
      </div>
    </RoleGuard>
  );
};

export default DepartmentsPage;
