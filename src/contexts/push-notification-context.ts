'use client';

import { createContext } from 'react';

export type PushNotificationSupport = {
  hasNotification: boolean;
  hasPushManager: boolean;
  hasServiceWorker: boolean;
  isSecureContext: boolean;
  isSupported: boolean;
};

export type PushNotificationContextValue = {
  isOnline: boolean;
  isPushPromptDismissed: boolean;
  pushSupport: PushNotificationSupport;
  dismissPushPrompt: () => void;
};

export const PushNotificationContext =
  createContext<PushNotificationContextValue | null>(null);
