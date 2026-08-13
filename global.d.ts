import { FC, PropsWithChildren } from 'react';
import auth from './messages/fa/auth.json';
import common from './messages/fa/common.json';
import mainLayout from './messages/fa/mainLayout.json';
import tickets from './messages/fa/tickets.json';

import ticketDetails from './messages/fa/ticketDetails.json';

type Messages = {
  common: typeof common;
  mainLayout: typeof mainLayout;
  auth: typeof auth;
  tickets: typeof tickets;
  ticketDetails: typeof ticketDetails;
};

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
  }
}
declare global {
  type FCC<P = object> = FC<PropsWithChildren<P>>;
  type PageQueryValue = string | string[] | undefined;
  type SelectOption<T = string> = {
    value: T;
    label: string;
  };
}
