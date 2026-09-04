'use client';

import { BellRing } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { PModal } from '@/components/ui';
import { ICON_SIZE_CLASS, PUSH_NOTIFICATION_PROMPT } from '@/constants';
import { usePushNotificationContext, usePushNotifications } from '@/hooks';

const PushPermissionModal = () => {
  const [hasPendingPrompt, setHasPendingPrompt] = useState(false);

  const clearPendingPrompt = useCallback(() => {
    window.sessionStorage.removeItem(
      PUSH_NOTIFICATION_PROMPT.afterLoginPromptKey,
    );
    setHasPendingPrompt(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHasPendingPrompt(
        window.sessionStorage.getItem(
          PUSH_NOTIFICATION_PROMPT.afterLoginPromptKey,
        ) === '1',
      );
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!hasPendingPrompt) {
    return null;
  }

  return <PushPermissionModalContent onPromptSettled={clearPendingPrompt} />;
};

interface PushPermissionModalContentProps {
  onPromptSettled: () => void;
}

const PushPermissionModalContent = ({
  onPromptSettled,
}: PushPermissionModalContentProps) => {
  const t = useTranslations('push');
  const { isOnline, isPushPromptDismissed, dismissPushPrompt } =
    usePushNotificationContext();
  const {
    canRequestPermission,
    isBackendEnabled,
    isBrowserSubscribed,
    isCheckingSubscription,
    isConfigLoading,
    isConfigReady,
    isPending,
    isSupported,
    permission,
    subscribe,
  } = usePushNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const description = (() => {
    if (!isOnline) {
      return t('offline');
    }

    if (!isBackendEnabled) {
      return t('disabled');
    }

    if (permission === 'denied') {
      return t('denied');
    }

    if (isBrowserSubscribed) {
      return t('enabled');
    }

    return t('description');
  })();

  const closeAndDismiss = useCallback(() => {
    dismissPushPrompt();
    onPromptSettled();
    setIsOpen(false);
  }, [dismissPushPrompt, onPromptSettled]);

  useEffect(() => {
    if (isCheckingSubscription || isConfigLoading) {
      return;
    }

    const canShowPrompt =
      isOnline &&
      !isPushPromptDismissed &&
      isSupported &&
      isConfigReady &&
      permission !== 'denied' &&
      !isBrowserSubscribed;

    const timeoutId = window.setTimeout(() => {
      if (canShowPrompt) {
        setIsOpen(true);
        return;
      }

      onPromptSettled();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    isBackendEnabled,
    isBrowserSubscribed,
    isCheckingSubscription,
    isConfigLoading,
    isConfigReady,
    isOnline,
    isPushPromptDismissed,
    isSupported,
    onPromptSettled,
    permission,
  ]);

  const handleEnable = async () => {
    try {
      await subscribe();
    } finally {
      onPromptSettled();
      setIsOpen(false);
    }
  };

  return (
    <PModal
      isOpen={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          closeAndDismiss();
          return;
        }

        setIsOpen(true);
      }}
      intent="action"
      size="md"
      title={t('modal.title')}
      description={t('modal.description')}
      ariaLabel={t('modal.ariaLabel')}
      footer={{
        cancel: {
          label: t('dismiss'),
          isDisabled: isPending,
          onPress: closeAndDismiss,
        },
        submit: {
          label: t('enable'),
          icon: <BellRing aria-hidden="true" className={ICON_SIZE_CLASS.sm} />,
          isDisabled: !canRequestPermission,
          isPending,
          closeOnPress: false,
          onPress: handleEnable,
        },
      }}
    >
      <div className="flex items-start gap-3 text-start">
        <span
          aria-hidden="true"
          className="bg-accent-soft text-accent-soft-foreground flex size-10 shrink-0 items-center justify-center rounded-md"
        >
          <BellRing className={ICON_SIZE_CLASS.md} />
        </span>

        <p className="text-body-sm text-muted leading-6">{description}</p>
      </div>
    </PModal>
  );
};

export default PushPermissionModal;
