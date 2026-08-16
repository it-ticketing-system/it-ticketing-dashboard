'use client';

import { RoleGuard } from '@/components/shared';

const SupportsPage = () => {
  return (
    <RoleGuard adminOnly>
      <div className="flex items-center justify-center p-6">
        <h1 className="text-h2 font-bold text-neutral-900">مدیریت پشتیبانان</h1>
      </div>
    </RoleGuard>
  );
};

export default SupportsPage;
