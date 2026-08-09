'use client';

import { RoleGuard } from '@/components/shared';

const UsersPage = () => {
  return (
    <RoleGuard adminOnly>
      <div className="flex items-center justify-center p-6">
        <h1 className="text-h2 text-neutral-900 font-bold">مدیریت کاربران</h1>
      </div>
    </RoleGuard>
  );
};

export default UsersPage;
