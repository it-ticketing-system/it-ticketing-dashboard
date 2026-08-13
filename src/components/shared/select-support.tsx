'use client';

import { Select, ListBox, Label } from '@heroui/react';
import { ChevronDown, LoaderCircle } from 'lucide-react';
import { ICON_SIZE_CLASS, QUERY_KEYS } from '@/constants';
import { cn } from '@/utils';
import { useGetRequest } from '@/hooks';
import { clientLookupServices } from '@/apis/services/lookups/client';

interface SelectSupportProps {
  departmentId?: string | null;
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const SelectSupport = ({
  departmentId,
  value,
  onChange,
  placeholder,
  label,
  ariaLabel,
  isDisabled,
  className,
  variant = 'secondary',
  fullWidth = true,
}: SelectSupportProps) => {
  const { data: supports, isLoading } = useGetRequest({
    queryKey: QUERY_KEYS.lookups.supports({
      departmentId: departmentId || undefined,
    }),
    requestFn: () =>
      clientLookupServices.getSupports({
        departmentId: departmentId || undefined,
      }),
  });

  return (
    <Select
      value={value || null}
      onChange={(val) => {
        onChange(val ? String(val) : null);
      }}
      placeholder={placeholder}
      isDisabled={isDisabled || isLoading || !supports}
      variant={variant}
      aria-label={label ? undefined : ariaLabel}
      className={cn(fullWidth && 'w-full', 'min-w-0', className)}
    >
      {label ? <Label>{label}</Label> : null}

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator>
          {isLoading ? (
            <LoaderCircle
              aria-hidden="true"
              className={cn(ICON_SIZE_CLASS.sm, 'animate-spin')}
            />
          ) : (
            <ChevronDown aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          )}
        </Select.Indicator>
      </Select.Trigger>

      <Select.Popover placement="bottom end">
        <ListBox aria-label={ariaLabel}>
          {(supports || []).map((sup) => (
            <ListBox.Item key={sup.id} id={sup.id} textValue={sup.name}>
              <span className="min-w-0 flex-1 truncate">{sup.name}</span>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
