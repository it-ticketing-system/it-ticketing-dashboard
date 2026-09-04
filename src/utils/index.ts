export { cn } from './cn';
export { toBackendProxyHref, toSafeBackendProxyHref } from './backend-href';
export { canAccessRoute, hasPermission, hasRole } from './permissions';
export type { RouteAccessOptions } from './permissions';
export { getPatchValue } from './get-patch-value';
export { formatPersianDate } from './format-persian-date';
export {
  formatPersianDateTime,
  formatPersianRelativeDateTime,
} from './format-persian-date-time';
export { toPositiveInteger } from './to-positive-integer';
export { getSearchParamValue } from './get-search-param-value';
export { createEmptyPaginatedData } from './pagination';

export {
  formatFileSize,
  getFileExtension,
  isAllowedFileExtension,
  isImageMimeType,
} from './files';

export { getUserInitials } from './get-user-initials';
export {
  getCurrentPushSubscription,
  subscribeCurrentBrowserToPush,
  toPushSubscriptionRequest,
  unsubscribeCurrentBrowserFromPush,
  urlBase64ToUint8Array,
} from './web-push';
export { removeCurrentBrowserPushSubscription } from './remove-current-browser-push-subscription';
