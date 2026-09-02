'use client';

import { Select, ListBox, Label } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';
import type { TicketStatus } from '@/models';

interface SelectStatusProps {
  value?: TicketStatus | null;
  onChange: (value: TicketStatus | null) => void;
  placeholder?: string;
  emptyOptionLabel?: string;
  label?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const STATUS_OPTIONS: TicketStatus[] = [
  'open',
  'inProgress',
  'waitingUser',
  'resolved',
  'closed',
];

const EMPTY_OPTION_VALUE = '__all__';

export const SelectStatus = ({
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
}: SelectStatusProps) => {
  const t = useTranslations('common.statuses');

  return (
    <Select
      value={value || null}
      onChange={(val) => {
        const nextValue = val ? String(val) : '';

        onChange(
          nextValue && nextValue !== EMPTY_OPTION_VALUE
            ? (nextValue as TicketStatus)
            : null,
        );
      }}
      placeholder={placeholder}
      isDisabled={isDisabled}
      variant={variant}
      aria-label={label ? undefined : ariaLabel}
      className={cn(fullWidth && 'w-full', 'min-w-0', className)}
    >
      {label ? <Label>{label}</Label> : null}

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator>
          <ChevronDown aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
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

          {STATUS_OPTIONS.map((st) => (
            <ListBox.Item key={st} id={st} textValue={t(st)}>
              <span className="min-w-0 flex-1 truncate">{t(st)}</span>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
