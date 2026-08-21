import { getRequestConfig } from 'next-intl/server';
import auth from '../../messages/fa/auth.json';
import common from '../../messages/fa/common.json';
import dashboard from '../../messages/fa/dashboard.json';
import departments from '../../messages/fa/departments.json';
import mainLayout from '../../messages/fa/mainLayout.json';
import notifications from '../../messages/fa/notifications.json';
import profile from '../../messages/fa/profile.json';
import reports from '../../messages/fa/reports.json';
import supports from '../../messages/fa/supports.json';
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
      dashboard,
      tickets,
      ticketDetails,
      users,
      supports,
      departments,
      notifications,
      profile,
      reports,
    },
  };
});
