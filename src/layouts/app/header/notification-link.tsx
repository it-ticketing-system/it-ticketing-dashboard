'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';
import { useUnreadNotificationsCount } from '@/hooks';
import NotificationBadge from './notification-badge';

const NotificationLink = () => {
  const t = useTranslations('mainLayout.header');
  const unreadNotificationsCount = useUnreadNotificationsCount();

  return (
    <div className="relative shrink-0">
      <Link
        href={ROUTES.notifications}
        aria-label={t('notifications')}
        className="focus-visible:ring-focus relative flex size-10 shrink-0 items-center justify-center rounded-lg text-neutral-600 transition-colors duration-[var(--motion-fast)] outline-none hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <Bell className={ICON_SIZE_CLASS.md} />
      </Link>

      <NotificationBadge
        count={unreadNotificationsCount}
        className="-start-1 -top-1 h-5"
      />
    </div>
  );
};

export default NotificationLink;
