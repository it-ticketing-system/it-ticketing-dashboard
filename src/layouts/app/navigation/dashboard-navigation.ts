import {
  BarChart3,
  Bell,
  Building2,
  Headphones,
  LayoutDashboard,
  Ticket,
  User,
  Users,
} from 'lucide-react';
import { canAccessRoute } from '@/utils';
import type { IUser, UserRole } from '@/models';
import type { LucideIcon } from 'lucide-react';

export type DashboardNavigationItem = {
  id: string;
  labelKey: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  allowedRoles?: UserRole[];
  adminOnly?: boolean;
  permission?: string;
};

export const dashboardNavigation: DashboardNavigationItem[] = [
  {
    id: 'dashboard',
    labelKey: 'nav.dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'tickets',
    labelKey: 'nav.tickets',
    href: '/dashboard/tickets',
    icon: Ticket,
  },
  {
    id: 'notifications',
    labelKey: 'nav.notifications',
    href: '/dashboard/notifications',
    icon: Bell,
  },
  {
    id: 'users',
    labelKey: 'nav.users',
    href: '/dashboard/users',
    icon: Users,
    adminOnly: true,
  },
  {
    id: 'supports',
    labelKey: 'nav.supports',
    href: '/dashboard/supports',
    icon: Headphones,
    adminOnly: true,
  },
  {
    id: 'departments',
    labelKey: 'nav.departments',
    href: '/dashboard/departments',
    icon: Building2,
    adminOnly: true,
  },
  {
    id: 'reports',
    labelKey: 'nav.reports',
    href: '/dashboard/reports',
    icon: BarChart3,
    adminOnly: true,
  },
  {
    id: 'profile',
    labelKey: 'nav.profile',
    href: '/dashboard/profile',
    icon: User,
  },
];

export const isNavigationItemActive = (
  item: DashboardNavigationItem,
  pathname: string,
): boolean => {
  if (item.href === '/dashboard') {
    return pathname === '/dashboard';
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
};

export const getFilteredNavigation = (
  items: DashboardNavigationItem[],
  user: IUser | null,
): DashboardNavigationItem[] => {
  return items.filter((item) =>
    canAccessRoute(user, {
      allowedRoles: item.allowedRoles,
      adminOnly: item.adminOnly,
      permission: item.permission,
    }),
  );
};

export const getMatchedNavigationItem = (
  pathname: string,
  user: IUser | null,
): DashboardNavigationItem | undefined => {
  const accessibleItems = getFilteredNavigation(dashboardNavigation, user);

  return accessibleItems
    .filter((item) => isNavigationItemActive(item, pathname))
    .sort((a, b) => b.href.length - a.href.length)[0];
};
