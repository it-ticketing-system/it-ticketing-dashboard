'use client';

import { Button } from '@heroui/react';
import { Filter } from 'lucide-react';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';

type MobileFilterTriggerProps = {
  ariaLabel: string;
  label: string;
  activeCount: number;
  onPress: () => void;
  variant?: 'icon' | 'inline';
  className?: string;
  badgeClassName?: string;
};

const MobileFilterTrigger = ({
  ariaLabel,
  label,
  activeCount,
  onPress,
  variant = 'inline',
  className,
  badgeClassName,
}: MobileFilterTriggerProps) => {
  const isIconVariant = variant === 'icon';

  return (
    <Button
      variant="outline"
      size="md"
      isIconOnly={isIconVariant}
      onPress={onPress}
      aria-label={ariaLabel}
      className={cn(
        'border-field-border bg-surface rounded-md',
        isIconVariant
          ? 'relative h-11 min-h-11 w-11 min-w-11 shrink-0'
          : 'h-11 min-w-0 justify-between',
        className,
      )}
    >
      {isIconVariant ? (
        <Filter aria-hidden="true" className={ICON_SIZE_CLASS.md} />
      ) : (
        <span className="flex min-w-0 items-center gap-2">
          <Filter aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          <span className="truncate">{label}</span>
        </span>
      )}

      {activeCount > 0 ? (
        <span
          aria-hidden="true"
          className={cn(
            'bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs',
            isIconVariant && 'absolute -start-1 -top-1',
            badgeClassName,
          )}
        >
          {activeCount}
        </span>
      ) : null}
    </Button>
  );
};

export default MobileFilterTrigger;
