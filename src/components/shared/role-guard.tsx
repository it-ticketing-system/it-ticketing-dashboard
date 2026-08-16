'use client';

import { Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { canAccessRoute } from '@/utils';
import type { UserRole } from '@/models';

export type RoleGuardProps = {
  allowedRoles?: UserRole[];
  adminOnly?: boolean;
  permission?: string;
  fallback?: React.ReactNode;
};

const RoleGuard: FCC<RoleGuardProps> = ({
  children,
  allowedRoles,
  adminOnly,
  permission,
  fallback,
}) => {
  const router = useRouter();
  const { user, isLoading, isUnauthenticated } = useAuth();

  const isAuthorized = canAccessRoute(user, {
    allowedRoles,
    adminOnly,
    permission,
  });

  useEffect(() => {
    if (!isLoading && !isAuthorized && !fallback) {
      router.replace(ROUTES.unauthorized);
    }
  }, [isLoading, isAuthorized, fallback, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isUnauthenticated || !isAuthorized) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

export default RoleGuard;
