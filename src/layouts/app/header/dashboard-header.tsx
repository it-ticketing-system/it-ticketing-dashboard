'use client';

import { Button } from '@heroui/react';
import { Menu, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS } from '@/constants';
import { useAuth } from '@/hooks';
import { getMatchedNavigationItem } from '../navigation/dashboard-navigation';
import NotificationLink from './notification-link';
import UserMenu from './user-menu';

export type DashboardHeaderProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onToggleMobileSidebar: () => void;
};

export const DashboardHeader = ({
  collapsed = false,
  onToggleCollapse,
  onToggleMobileSidebar,
}: DashboardHeaderProps) => {
  const pathname = usePathname();
  const tHeader = useTranslations('mainLayout.header');
  const tNav = useTranslations('mainLayout.nav');
  const { user } = useAuth();

  const matchedItem = getMatchedNavigationItem(pathname, user);

  const getPageTitle = (): string => {
    if (!matchedItem) {
      return '-';
    }
    switch (matchedItem.id) {
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

  const pageTitle = getPageTitle();

  return (
    <header className="bg-surface sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-neutral-200/80 px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          onClick={onToggleMobileSidebar}
          aria-label={tHeader('toggleSidebar')}
          className="lg:hidden"
        >
          <Menu className={ICON_SIZE_CLASS.md} />
        </Button>

        {onToggleCollapse ? (
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            aria-label={tHeader('toggleSidebar')}
            className="hidden text-neutral-600 hover:text-neutral-900 lg:flex"
          >
            {collapsed ? (
              <PanelRightOpen className={ICON_SIZE_CLASS.md} />
            ) : (
              <PanelRightClose className={ICON_SIZE_CLASS.md} />
            )}
          </Button>
        ) : null}

        <h1 className="text-h3 font-bold text-neutral-900">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-1 lg:gap-3">
        <NotificationLink />
        <UserMenu />
      </div>
    </header>
  );
};
