'use client';

import { Button } from '@heroui/react';
import { useAuth } from '@/hooks';

const OverviewPage = () => {
  const { logout } = useAuth();

  return (
    <div className="flex items-center justify-center">
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default OverviewPage;
