import { clientPushServices } from '@/apis/services/push/client';
import {
  getCurrentPushSubscription,
  unsubscribeCurrentBrowserFromPush,
} from './web-push';

export const removeCurrentBrowserPushSubscription = async () => {
  const pushSubscription = await getCurrentPushSubscription().catch(() => null);

  if (!pushSubscription) {
    return;
  }

  await clientPushServices
    .unsubscribeCurrentBrowser({
      endpoint: pushSubscription.endpoint,
    })
    .catch(() => undefined);
  await unsubscribeCurrentBrowserFromPush().catch(() => undefined);
};
