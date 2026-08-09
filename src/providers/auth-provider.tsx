'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { clientAuthServices } from '@/apis/services/auth/client';
import { QUERY_KEYS, ROUTES } from '@/constants';
import { AuthContext } from '@/contexts';
import { useGetRequest } from '@/hooks';

const AuthProvider: FCC = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    data: user,
    error,
    isLoading,
    isFetching,
    refetch,
    reset,
  } = useGetRequest({
    queryKey: QUERY_KEYS.auth.me,
    requestFn: clientAuthServices.getMe,
    showErrorToast: false,
  });

  const isUserForbidden = Boolean(user) && user?.role === 'USER';
  const isUnauthenticated = error?.status === 401 || isUserForbidden;
  const isAuthenticated = Boolean(user) && !isUnauthenticated;

  useEffect(() => {
    if (!isUnauthenticated) {
      return;
    }

    queryClient.clear();
    reset();
    router.replace(ROUTES.login);
  }, [isUnauthenticated, queryClient, reset, router]);

  const isAdmin = user?.role === 'ADMIN';
  const isSupport = user?.role === 'SUPPORT';

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) {
        return false;
      }
      if (user.role === 'ADMIN' || user.permissions.includes('*')) {
        return true;
      }
      return user.permissions.includes(permission);
    },
    [user],
  );

  const hasDepartment = useCallback(
    (departmentId: number): boolean => {
      if (!user) {
        return false;
      }
      if (user.role === 'ADMIN') {
        return true;
      }
      return user.departments.some(
        (department) => department.id === departmentId,
      );
    },
    [user],
  );

  const status = useMemo(() => {
    if (isLoading) {
      return 'loading' as const;
    }

    if (isUnauthenticated) {
      return 'unauthenticated' as const;
    }

    if (isAuthenticated) {
      return 'authenticated' as const;
    }

    if (error) {
      return 'error' as const;
    }

    return 'loading' as const;
  }, [isLoading, isUnauthenticated, isAuthenticated, error]);

  const logout = useCallback(async () => {
    try {
      setIsLoggingOut(true);

      await clientAuthServices.logout().catch(() => undefined);
      queryClient.clear();
      reset();

      router.replace(ROUTES.login);
    } finally {
      setIsLoggingOut(false);
    }
  }, [queryClient, reset, router]);

  const value = useMemo(
    () => ({
      user: isUserForbidden ? null : user,
      status,
      isAuthenticated,
      isUnauthenticated,
      isLoading,
      isFetching,
      isLoggingOut,
      isAdmin,
      isSupport,
      error,
      refresh: refetch,
      reset,
      logout,
      hasPermission,
      hasDepartment,
    }),
    [
      isUserForbidden,
      user,
      status,
      isAuthenticated,
      isUnauthenticated,
      isLoading,
      isFetching,
      isLoggingOut,
      isAdmin,
      isSupport,
      error,
      refetch,
      reset,
      logout,
      hasPermission,
      hasDepartment,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
