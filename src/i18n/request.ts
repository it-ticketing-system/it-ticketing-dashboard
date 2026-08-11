import { getRequestConfig } from 'next-intl/server';
import auth from '../../messages/fa/auth.json';
import common from '../../messages/fa/common.json';
import mainLayout from '../../messages/fa/mainLayout.json';
import tickets from '../../messages/fa/tickets.json';

export default getRequestConfig(async () => {
  return {
    locale: 'fa',
    messages: {
      mainLayout,
      common,
      auth,
      tickets
    },
  };
});
