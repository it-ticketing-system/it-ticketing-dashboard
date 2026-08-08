import { getRequestConfig } from 'next-intl/server';
import common from '../../messages/fa/common.json';
import mainLayout from '../../messages/fa/mainLayout.json';

export default getRequestConfig(async () => {
  return {
    locale: 'fa',
    messages: {
      mainLayout,
      common,
    },
  };
});
