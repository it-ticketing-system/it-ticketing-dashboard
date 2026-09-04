import { PUSH_NOTIFICATION_SERVICE_WORKER } from '@/constants';
import type { CreatePushSubscriptionRequest } from '@/apis/services/push/client';

type PushSubscriptionJson = PushSubscriptionJSON & {
  endpoint?: string;
  keys?: {
    p256dh?: string;
    auth?: string;
  };
};

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    platform?: string;
  };
};

const SERVICE_WORKER_READY_TIMEOUT_MS = 3000;

const getPushServiceWorkerRegistration = async () => {
  const registration = await navigator.serviceWorker.getRegistration(
    PUSH_NOTIFICATION_SERVICE_WORKER.scope,
  );

  if (registration) {
    return registration;
  }

  return Promise.race<ServiceWorkerRegistration | null>([
    navigator.serviceWorker.ready,
    new Promise((resolve) => {
      window.setTimeout(() => resolve(null), SERVICE_WORKER_READY_TIMEOUT_MS);
    }),
  ]);
};

const getBrowserName = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('Edg/')) {
    return 'Edge';
  }

  if (userAgent.includes('Chrome/')) {
    return 'Chrome';
  }

  if (userAgent.includes('Firefox/')) {
    return 'Firefox';
  }

  if (userAgent.includes('Safari/')) {
    return 'Safari';
  }

  return 'Browser';
};

const getPlatformName = () => {
  const nav = navigator as NavigatorWithUserAgentData;
  const userAgentDataPlatform = nav.userAgentData?.platform?.trim();

  if (userAgentDataPlatform) {
    return userAgentDataPlatform;
  }

  const userAgent = navigator.userAgent;

  if (/Windows/i.test(userAgent)) {
    return 'Windows';
  }

  if (/Android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'iOS';
  }

  if (/Mac OS X|Macintosh/i.test(userAgent)) {
    return 'macOS';
  }

  if (/Linux/i.test(userAgent)) {
    return 'Linux';
  }

  return undefined;
};

export const urlBase64ToUint8Array = (value: string) => {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const base64 = `${value}${padding}`.replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let index = 0; index < rawData.length; index += 1) {
    outputArray[index] = rawData.charCodeAt(index);
  }

  return outputArray;
};

export const getCurrentPushSubscription = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return null;
  }

  const registration = await getPushServiceWorkerRegistration();

  if (!registration) {
    return null;
  }

  return registration.pushManager.getSubscription();
};

export const toPushSubscriptionRequest = (
  subscription: PushSubscription,
): CreatePushSubscriptionRequest => {
  const json = subscription.toJSON() as PushSubscriptionJson;

  if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) {
    throw new Error('Push subscription is missing required browser keys.');
  }

  const browserName = getBrowserName();
  const platformName = getPlatformName();

  return {
    endpoint: json.endpoint,
    expirationTime: json.expirationTime ?? null,
    keys: {
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
    device: {
      name: platformName ? `${browserName} on ${platformName}` : browserName,
      platform: platformName,
      userAgent: navigator.userAgent,
    },
  };
};

export const subscribeCurrentBrowserToPush = async (vapidPublicKey: string) => {
  const registration = await getPushServiceWorkerRegistration();

  if (!registration) {
    throw new Error('Service worker registration is not available.');
  }

  const existingSubscription = await registration.pushManager.getSubscription();

  return (
    existingSubscription ??
    (await registration.pushManager.subscribe({
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      userVisibleOnly: true,
    }))
  );
};

export const unsubscribeCurrentBrowserFromPush = async () => {
  const subscription = await getCurrentPushSubscription();

  if (!subscription) {
    return;
  }

  await subscription.unsubscribe().catch(() => undefined);
};
