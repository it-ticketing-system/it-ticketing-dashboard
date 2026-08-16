import { getRequestConfig } from 'next-intl/server';
import auth from '../../messages/fa/auth.json';
import common from '../../messages/fa/common.json';
import mainLayout from '../../messages/fa/mainLayout.json';
import ticketDetails from '../../messages/fa/ticketDetails.json';
import tickets from '../../messages/fa/tickets.json';
import users from '../../messages/fa/users.json';

export default getRequestConfig(async () => {
  return {
    locale: 'fa',
    messages: {
      mainLayout,
      common,
      auth,
      tickets,
      ticketDetails,
      users,
    },
  };
});
