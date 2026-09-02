'use client';

import { Skeleton } from '@heroui/react';
import { TableEmptyState, TableErrorState } from './table-states';
import type { ApiRequestError } from '@/apis/core/api-error';

type ChartPanelProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: ApiRequestError | null;
  errorMessage?: string;
  emptyTitle: string;
  emptyDescription?: string;
  isEmpty?: boolean;
  isLoading?: boolean;
  isRetrying?: boolean;
  onRetry?: () => void;
};

const ChartPanel = ({
  title,
  description,
  children,
  error,
  errorMessage,
  emptyTitle,
  emptyDescription,
  isEmpty = false,
  isLoading = false,
  isRetrying = false,
  onRetry,
}: ChartPanelProps) => {
  return (
    <section className="border-border bg-surface min-w-0 rounded-xl border p-4 shadow-sm">
      <div className="mb-4 space-y-1">
        <h2 className="text-title text-foreground">{title}</h2>
        {description ? (
          <p className="text-caption text-muted">{description}</p>
        ) : null}
      </div>

      {isLoading ? (
        <Skeleton className="h-72 rounded-lg" />
      ) : error ? (
        <TableErrorState
          title={title}
          errorMessage={errorMessage ?? error.code}
          isRetrying={isRetrying}
          onRetry={onRetry}
          className="min-h-72"
        />
      ) : isEmpty ? (
        <TableEmptyState
          title={emptyTitle}
          description={emptyDescription}
          className="min-h-72"
        />
      ) : (
        <div className="h-72 min-w-0">{children}</div>
      )}
    </section>
  );
};

export default ChartPanel;
