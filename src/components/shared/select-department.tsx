'use client';

import { Select, ListBox, Label } from '@heroui/react';
import { ChevronDown, LoaderCircle } from 'lucide-react';
import { clientLookupServices } from '@/apis/services/lookups/client';
import { ICON_SIZE_CLASS, QUERY_KEYS } from '@/constants';
import { useGetRequest } from '@/hooks';
import { cn } from '@/utils';

interface SelectDepartmentProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  emptyOptionLabel?: string;
  label?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const EMPTY_OPTION_VALUE = '__all__';

export const SelectDepartment = ({
  value,
  onChange,
  placeholder,
  emptyOptionLabel,
  label,
  ariaLabel,
  isDisabled,
  className,
  variant = 'secondary',
  fullWidth = true,
}: SelectDepartmentProps) => {
  const { data: departments, isLoading } = useGetRequest({
    queryKey: QUERY_KEYS.lookups.departments,
    requestFn: () => clientLookupServices.getDepartments(),
  });

  const computedAriaLabel =
    ariaLabel || label || placeholder || 'Select department';

  return (
    <Select
      value={value || null}
      onChange={(val) => {
        const nextValue = val ? String(val) : '';

        onChange(
          nextValue && nextValue !== EMPTY_OPTION_VALUE ? nextValue : null,
        );
      }}
      placeholder={placeholder}
      isDisabled={isDisabled || isLoading || !departments}
      variant={variant}
      aria-label={label ? undefined : computedAriaLabel}
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
          {emptyOptionLabel ? (
            <ListBox.Item
              key={EMPTY_OPTION_VALUE}
              id={EMPTY_OPTION_VALUE}
              textValue={emptyOptionLabel}
            >
              <span className="min-w-0 flex-1 truncate">
                {emptyOptionLabel}
              </span>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ) : null}

          {(departments || []).map((dep) => (
            <ListBox.Item key={dep.id} id={dep.id} textValue={dep.name}>
              <span className="min-w-0 flex-1 truncate">{dep.name}</span>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
