'use client';

import { clientNotificationServices } from '@/apis/services/notifications/client';
import { QUERY_KEYS } from '@/constants';
import useGetRequest from './use-get-request';

export default function useUnreadNotificationsCount(): number {
  const { data } = useGetRequest({
    queryKey: QUERY_KEYS.notifications.unreadCount,
    requestFn: (signal) =>
      clientNotificationServices.getUnreadNotificationsCount(signal),
    staleTime: 30_000,
    showErrorToast: false,
  });

  return data ?? 0;
}
