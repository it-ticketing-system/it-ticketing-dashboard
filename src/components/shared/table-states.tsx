'use client';

import { Button } from '@heroui/react';
import { AlertCircle, Inbox, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';

export interface TableErrorStateProps {
  title?: string;
  errorMessage: string;
  className?: string;
  isRetrying?: boolean;
  onRetry?: () => void;
}

export interface TableEmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

const stateClassName =
  'flex min-h-52 flex-col items-center justify-center gap-3 px-6 py-10 text-center';

export const TableErrorState = ({
  title,
  errorMessage,
  className,
  isRetrying = false,
  onRetry,
}: TableErrorStateProps) => {
  const t = useTranslations('common.table.error');
  const errorTitle = title ?? t('title');

  return (
    <div className={cn(stateClassName, className)}>
      <div className="bg-danger-50 text-danger flex size-12 items-center justify-center rounded-full">
        <AlertCircle aria-hidden="true" className={ICON_SIZE_CLASS.lg} />
      </div>

      <div className="space-y-1">
        <p className="text-title text-foreground">{errorTitle}</p>
        <p className="text-body-sm text-muted">{errorMessage}</p>
      </div>

      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          isPending={isRetrying}
          onPress={onRetry}
          className="mt-1 h-10"
        >
          <RefreshCw aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          {t('retry')}
        </Button>
      )}
    </div>
  );
};

export const TableEmptyState = ({
  title,
  description,
  className,
}: TableEmptyStateProps) => {
  return (
    <div className={cn(stateClassName, className)}>
      <div className="bg-primary-50 text-accent flex size-12 items-center justify-center rounded-full">
        <Inbox aria-hidden="true" className={ICON_SIZE_CLASS.lg} />
      </div>

      <div className="space-y-1">
        <p className="text-title text-foreground">{title}</p>
        {description && (
          <p className="text-body-sm text-muted">{description}</p>
        )}
      </div>
    </div>
  );
};
