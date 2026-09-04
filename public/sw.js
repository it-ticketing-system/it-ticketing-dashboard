const APP_SCOPE = '/dashboard';
const DEFAULT_NOTIFICATION_URL = '/dashboard/notifications';
const NOTIFICATION_ICON = '/icons/icon-192.png';
const DEFAULT_NOTIFICATION_TITLE = 'اعلان جدید';
const DEFAULT_NOTIFICATION_BODY = 'یک اعلان جدید دارید.';

const getSafeAppUrl = (value) => {
  if (typeof value !== 'string') {
    return DEFAULT_NOTIFICATION_URL;
  }

  try {
    const url = new URL(value, self.location.origin);

    if (url.origin !== self.location.origin) {
      return DEFAULT_NOTIFICATION_URL;
    }

    if (!url.pathname.startsWith(APP_SCOPE)) {
      return DEFAULT_NOTIFICATION_URL;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_NOTIFICATION_URL;
  }
};

const getPushPayload = (event) => {
  try {
    return event.data?.json?.() ?? {};
  } catch {
    return {};
  }
};

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const payload = getPushPayload(event);
  const title =
    typeof payload.title === 'string'
      ? payload.title
      : DEFAULT_NOTIFICATION_TITLE;
  const body =
    typeof payload.body === 'string' ? payload.body : DEFAULT_NOTIFICATION_BODY;
  const url = getSafeAppUrl(payload.data?.url ?? payload.url);
  const tag =
    typeof payload.tag === 'string'
      ? payload.tag
      : `notification:${payload.notificationId ?? Date.now()}`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      icon: NOTIFICATION_ICON,
      badge: NOTIFICATION_ICON,
      dir: 'rtl',
      lang: 'fa',
      data: {
        url,
      },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = getSafeAppUrl(event.notification.data?.url);
  const absoluteUrl = new URL(url, self.location.origin).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        const existingClient = clients.find((client) => {
          return client.url.startsWith(self.location.origin);
        });

        if (existingClient) {
          existingClient.focus();
          return existingClient.navigate(absoluteUrl);
        }

        return self.clients.openWindow(absoluteUrl);
      }),
  );
});
