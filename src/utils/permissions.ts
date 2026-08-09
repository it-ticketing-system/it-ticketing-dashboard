import type { IUser, UserRole } from '@/models';

export type RouteAccessOptions = {
  allowedRoles?: UserRole[];
  adminOnly?: boolean;
  permission?: string;
};

export const hasRole = (
  user: IUser | null,
  allowedRoles?: UserRole[],
): boolean => {
  if (!user) {
    return false;
  }
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }
  return allowedRoles.includes(user.role);
};

export const hasPermission = (
  user: IUser | null,
  permission?: string,
): boolean => {
  if (!user) {
    return false;
  }
  if (!permission) {
    return true;
  }
  if (user.role === 'ADMIN' || user.permissions.includes('*')) {
    return true;
  }
  return user.permissions.includes(permission);
};

export const canAccessRoute = (
  user: IUser | null,
  options?: RouteAccessOptions,
): boolean => {
  if (!user) {
    return false;
  }

  if (user.role === 'USER') {
    return false;
  }

  if (options?.adminOnly && user.role !== 'ADMIN') {
    return false;
  }

  if (options?.allowedRoles && !options.allowedRoles.includes(user.role)) {
    return false;
  }

  if (options?.permission && !hasPermission(user, options.permission)) {
    return false;
  }

  return true;
};
