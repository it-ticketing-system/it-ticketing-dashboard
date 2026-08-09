'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/shared';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { cn } from '@/utils';
import {
  dashboardNavigation,
  getFilteredNavigation,
  isNavigationItemActive,
  type DashboardNavigationItem,
} from '../navigation/dashboard-navigation';
import SidebarSkeleton from './sidebar-skeleton';

export type DashboardSidebarProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

type NavigationItemProps = {
  item: DashboardNavigationItem;
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
};

const NavigationItem = ({
  item,
  pathname,
  collapsed,
  onNavigate,
}: NavigationItemProps) => {
  const tNav = useTranslations('mainLayout.nav');
  const active = isNavigationItemActive(item, pathname);
  const Icon = item.icon;

  const getItemLabel = (): string => {
    switch (item.id) {
      case 'dashboard':
        return tNav('dashboard');
      case 'tickets':
        return tNav('tickets');
      case 'notifications':
        return tNav('notifications');
      case 'users':
        return tNav('users');
      case 'supports':
        return tNav('supports');
      case 'departments':
        return tNav('departments');
      case 'reports':
        return tNav('reports');
      case 'profile':
        return tNav('profile');
      default:
        return tNav('dashboard');
    }
  };

  const label = getItemLabel();

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group text-body-sm focus-visible:ring-focus flex h-10 w-full items-center rounded-lg font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        collapsed ? 'justify-center px-0' : 'gap-3 px-3',
        active
          ? 'bg-primary-50 text-primary-700 font-semibold shadow-2xs'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
      )}
    >
      <Icon
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
      />

      {!collapsed ? (
        <>
          <span className="min-w-0 flex-1 truncate text-start transition-opacity duration-200">
            {label}
          </span>

          {item.badge ? (
            <span className="bg-success-100 text-success-700 text-badge shrink-0 rounded-full px-2 py-0.5 font-semibold">
              {item.badge}
            </span>
          ) : null}
        </>
      ) : null}
    </Link>
  );
};

const SidebarBrand = ({ collapsed }: { collapsed: boolean }) => {
  const tHeader = useTranslations('mainLayout.header');

  return (
    <Link
      href={ROUTES.dashboard}
      className={cn(
        'flex h-16 shrink-0 items-center border-b border-neutral-200/60 transition-all duration-300',
        collapsed ? 'justify-center px-2' : 'gap-3 px-4',
      )}
    >
      <Logo />

      {!collapsed ? (
        <div className="min-w-0 transition-opacity duration-200">
          <p className="text-body-sm truncate font-bold text-neutral-900">
            {tHeader('brandTitle')}
          </p>
          <p className="text-caption truncate text-neutral-500">
            {tHeader('brandSubtitle')}
          </p>
        </div>
      ) : null}
    </Link>
  );
};

export const DashboardSidebar = ({
  collapsed = false,
  onNavigate,
}: DashboardSidebarProps) => {
  const pathname = usePathname();
  const tHeader = useTranslations('mainLayout.header');
  const { user, isLoading } = useAuth();

  const filteredMainItems = getFilteredNavigation(dashboardNavigation, user);

  if (isLoading) {
    return <SidebarSkeleton collapsed={collapsed} />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <SidebarBrand collapsed={collapsed} />

      <nav
        aria-label={tHeader('mainNav')}
        className={cn(
          'min-h-0 flex-1 overflow-y-auto py-3 transition-all duration-300',
          collapsed ? 'px-2' : 'px-3',
        )}
      >
        <div className="space-y-1">
          {filteredMainItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              pathname={pathname}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
