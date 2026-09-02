'use client';

import { cn } from '@/utils';
import type { ElementType, ReactNode } from 'react';

type FilterToolbarProps = {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  as?: ElementType;
};

const FilterToolbar = ({
  children,
  ariaLabel,
  className,
  as: Component = 'section',
}: FilterToolbarProps) => {
  return (
    <Component
      aria-label={ariaLabel}
      className={cn(
        'border-border bg-surface rounded-xl border p-4 shadow-sm',
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default FilterToolbar;
