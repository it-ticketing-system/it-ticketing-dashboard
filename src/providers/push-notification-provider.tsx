'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  PUSH_NOTIFICATION_PROMPT,
  PUSH_NOTIFICATION_SERVICE_WORKER,
} from '@/constants';
import {
  PushNotificationContext,
  type PushNotificationContextValue,
  type PushNotificationSupport,
} from '@/contexts';

const getPushSupport = (): PushNotificationSupport => {
  if (typeof window === 'undefined') {
    return {
      hasNotification: false,
      hasPushManager: false,
      hasServiceWorker: false,
      isSecureContext: false,
      isSupported: false,
    };
  }

  const hasNotification = 'Notification' in window;
  const hasPushManager = 'PushManager' in window;
  const hasServiceWorker = 'serviceWorker' in navigator;
  const isSecureContext = window.isSecureContext;

  return {
    hasNotification,
    hasPushManager,
    hasServiceWorker,
    isSecureContext,
    isSupported:
      hasNotification && hasPushManager && hasServiceWorker && isSecureContext,
  };
};

const getPushPromptDismissed = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const dismissedUntil = Number(
    window.localStorage.getItem(PUSH_NOTIFICATION_PROMPT.dismissedUntilKey),
  );

  return Number.isFinite(dismissedUntil) && dismissedUntil > Date.now();
};

const PushNotificationProvider = ({ children }: PropsWithChildren) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isPushPromptDismissed, setIsPushPromptDismissed] = useState(false);
  const [pushSupport] = useState<PushNotificationSupport>(() =>
    getPushSupport(),
  );

  useEffect(() => {
    const hydrationTimeoutId = window.setTimeout(() => {
      setIsOnline(navigator.onLine);
      setIsPushPromptDismissed(getPushPromptDismissed());
    }, 0);
    const updateOnlineState = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineState);
    window.addEventListener('offline', updateOnlineState);

    return () => {
      window.removeEventListener('online', updateOnlineState);
      window.removeEventListener('offline', updateOnlineState);
      window.clearTimeout(hydrationTimeoutId);
    };
  }, []);

  useEffect(() => {
    if (!pushSupport.hasServiceWorker) {
      return;
    }

    void navigator.serviceWorker
      .register(PUSH_NOTIFICATION_SERVICE_WORKER.scriptUrl, {
        scope: PUSH_NOTIFICATION_SERVICE_WORKER.scope,
      })
      .catch(() => undefined);
  }, [pushSupport.hasServiceWorker]);

  const dismissPushPrompt = useCallback(() => {
    const dismissedUntil = Date.now() + PUSH_NOTIFICATION_PROMPT.dismissTtlMs;
    window.localStorage.setItem(
      PUSH_NOTIFICATION_PROMPT.dismissedUntilKey,
      String(dismissedUntil),
    );
    setIsPushPromptDismissed(true);
  }, []);

  const value = useMemo<PushNotificationContextValue>(
    () => ({
      isOnline,
      isPushPromptDismissed,
      pushSupport,
      dismissPushPrompt,
    }),
    [dismissPushPrompt, isOnline, isPushPromptDismissed, pushSupport],
  );

  return (
    <PushNotificationContext.Provider value={value}>
      {children}
    </PushNotificationContext.Provider>
  );
};

export default PushNotificationProvider;
