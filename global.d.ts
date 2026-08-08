import { FC, PropsWithChildren } from "react";
import common from "./messages/fa/common.json";
import mainLayout from "./messages/fa/mainLayout.json";

type Messages = {
  common: typeof common;
  mainLayout: typeof mainLayout;
};

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
declare global {
  type FCC<P = object> = FC<PropsWithChildren<P>>;
}
