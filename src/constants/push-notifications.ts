export const PUSH_NOTIFICATION_PROMPT = {
  afterLoginPromptKey: 'push:show-permission-after-login',
  dismissedUntilKey: 'push:permission-dismissed-until',
  dismissTtlMs: 7 * 24 * 60 * 60 * 1000,
} as const;

export const PUSH_NOTIFICATION_SERVICE_WORKER = {
  scriptUrl: '/sw.js',
  scope: '/dashboard',
} as const;
