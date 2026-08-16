import { cn } from '@/utils';

export type NotificationBadgeProps = {
  count: number;
  className?: string;
};

export const getNotificationBadgeLabel = (count: number): string => {
  return count > 99 ? '99+' : String(count);
};

const NotificationBadge = ({ count, className }: NotificationBadgeProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      className={cn(
        'bg-danger-500 text-badge absolute flex min-w-5 items-center justify-center rounded-full border-2 border-white px-1 font-bold text-white',
        className,
      )}
    >
      {getNotificationBadgeLabel(count)}
    </span>
  );
};

export default NotificationBadge;
