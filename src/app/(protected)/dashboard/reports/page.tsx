'use client';

import { RoleGuard } from '@/components/shared';

const ReportsPage = () => {
  return (
    <RoleGuard adminOnly>
      <div className="flex items-center justify-center p-6">
        <h1 className="text-h2 font-bold text-neutral-900">گزارش‌ها</h1>
      </div>
    </RoleGuard>
  );
};

export default ReportsPage;
