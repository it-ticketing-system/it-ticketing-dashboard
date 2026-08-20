'use client';

import { Button } from '@heroui/react';
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';
import { ICON_SIZE_CLASS } from '@/constants';

type DashboardErrorStateProps = {
  title: string;
  errorMessage: string;
  retryLabel: string;
  isRetrying: boolean;
  onRetry: () => void;
};

export const DashboardErrorState = ({
  title,
  errorMessage,
  retryLabel,
  isRetrying,
  onRetry,
}: DashboardErrorStateProps) => {
  return (
    <div className="border-danger-200 bg-danger-50 flex flex-col items-start gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="bg-surface text-danger-600 flex size-10 shrink-0 items-center justify-center rounded-lg">
          <AlertTriangle aria-hidden="true" className={ICON_SIZE_CLASS.md} />
        </span>
        <div className="min-w-0">
          <p className="text-title text-danger-900">{title}</p>
          <p className="text-body-sm text-danger-700 mt-1">{errorMessage}</p>
        </div>
      </div>

      <Button
        variant="danger-soft"
        size="sm"
        isPending={isRetrying}
        onPress={onRetry}
      >
        <RefreshCw aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
        {retryLabel}
      </Button>
    </div>
  );
};

type DashboardEmptyStateProps = {
  title: string;
  description: string;
};

export const DashboardEmptyState = ({
  title,
  description,
}: DashboardEmptyStateProps) => {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-10 text-center">
      <span className="bg-surface mb-4 flex size-12 items-center justify-center rounded-xl text-neutral-500 shadow-sm">
        <Inbox aria-hidden="true" className={ICON_SIZE_CLASS.md} />
      </span>
      <p className="text-title text-neutral-900">{title}</p>
      <p className="text-body-sm mt-2 max-w-md text-neutral-600">
        {description}
      </p>
    </div>
  );
};
