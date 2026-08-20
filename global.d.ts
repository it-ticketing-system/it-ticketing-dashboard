import { FC, PropsWithChildren } from 'react';
import auth from './messages/fa/auth.json';
import common from './messages/fa/common.json';
import departments from './messages/fa/departments.json';
import mainLayout from './messages/fa/mainLayout.json';
import notifications from './messages/fa/notifications.json';
import supports from './messages/fa/supports.json';
import ticketDetails from './messages/fa/ticketDetails.json';
import tickets from './messages/fa/tickets.json';
import users from './messages/fa/users.json';


type Messages = {
  common: typeof common;
  mainLayout: typeof mainLayout;
  auth: typeof auth;
  tickets: typeof tickets;
  ticketDetails: typeof ticketDetails;
  users: typeof users;
  supports: typeof supports;
  departments: typeof departments;
  notifications: typeof notifications;
};

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
  }
}
declare global {
  type FCC<P = object> = FC<PropsWithChildren<P>>;
  type PageQueryValue = string | string[] | undefined;
  type PageSearchParams = Record<string, PageQueryValue>;
  type SelectOption<T = string> = {
    value: T;
    label: string;
  };
}
