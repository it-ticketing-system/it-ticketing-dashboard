'use client';

import { useContext } from 'react';
import { PushNotificationContext } from '@/contexts';

const usePushNotificationContext = () => {
  const context = useContext(PushNotificationContext);

  if (!context) {
    throw new Error(
      'usePushNotificationContext must be used within PushNotificationProvider.',
    );
  }

  return context;
};

export default usePushNotificationContext;
