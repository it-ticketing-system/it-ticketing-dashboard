'use client';

import { Avatar, Button, Dropdown, Label, Separator } from '@heroui/react';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { cn } from '@/utils';
import type { Key } from 'react';

const UserMenu = () => {
  const tHeader = useTranslations('mainLayout.header');
  const tRoles = useTranslations('mainLayout.roles');
  const router = useRouter();
  const { user, isLoggingOut, logout } = useAuth();

  const userName = user?.name || tHeader('user');
  const userInitials = userName.trim().charAt(0).toUpperCase();

  const getRoleLabel = () => {
    if (!user) {
      return '';
    }
    if (user.role === 'ADMIN') {
      return tRoles('ADMIN');
    }
    if (user.role === 'SUPPORT') {
      return tRoles('SUPPORT');
    }
    return tRoles('USER');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMenuAction = (key: Key) => {
    if (key === 'profile') {
      router.push(ROUTES.profile);
      return;
    }

    if (key === 'logout') {
      void handleLogout();
    }
  };

  return (
    <Dropdown>
      <Button
        variant="ghost"
        aria-label={tHeader('userMenu')}
        className="h-12 min-w-0 gap-2.5 rounded-lg px-1.5 lg:px-2.5"
      >
        <Avatar className="bg-primary-100 text-primary-700 size-8 shrink-0 font-bold">
          {userInitials}
        </Avatar>

        <div className="hidden flex-col items-start text-start lg:flex">
          <span className="text-body-sm truncate leading-tight font-semibold text-neutral-900">
            {userName}
          </span>
          <span className="text-caption leading-tight font-normal text-neutral-500">
            {getRoleLabel()}
          </span>
        </div>

        <ChevronDown
          className={cn(
            'hidden shrink-0 text-neutral-400 lg:block',
            ICON_SIZE_CLASS.sm,
          )}
        />
      </Button>

      <Dropdown.Popover
        placement="bottom left"
        className="min-w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg"
      >
        <Dropdown.Menu
          aria-label={tHeader('userMenu')}
          onAction={handleMenuAction}
        >
          <Dropdown.Item id="profile" textValue={tHeader('profile')}>
            <UserRound className={ICON_SIZE_CLASS.md} />
            <Label>{tHeader('profile')}</Label>
          </Dropdown.Item>

          <Separator />

          <Dropdown.Item
            id="logout"
            textValue={tHeader('logout')}
            variant="danger"
            isDisabled={isLoggingOut}
          >
            <LogOut className={ICON_SIZE_CLASS.md} />
            <Label>{tHeader('logout')}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default UserMenu;
