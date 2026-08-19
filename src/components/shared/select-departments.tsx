'use client';


import { ComboBox, Input, Label, ListBox } from '@heroui/react';
import { LoaderCircle } from 'lucide-react';
import { clientLookupServices } from '@/apis/services/lookups/client';
import { ICON_SIZE_CLASS, QUERY_KEYS } from '@/constants';
import { useGetRequest } from '@/hooks';
import { cn } from '@/utils';
import type { Key } from '@heroui/react';

interface SelectDepartmentsProps {
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const SelectDepartments = ({
  value = [],
  onChange,
  placeholder,
  label,
  ariaLabel,
  isDisabled = false,
  className,
  variant = 'secondary',
  fullWidth = true,
}: SelectDepartmentsProps) => {
  const { data: departments, isLoading } = useGetRequest({
    queryKey: QUERY_KEYS.lookups.departments,
    requestFn: () => clientLookupServices.getDepartments(),
  });

  const handleChange = (keys: Key | null | Key[]) => {
    if (!Array.isArray(keys)) {
      onChange(keys == null ? [] : [String(keys)]);
      return;
    }

    onChange(keys.map(String));
  };

  return (
    <ComboBox
      selectionMode="multiple"
      value={value}
      onChange={handleChange}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
      isDisabled={isDisabled || isLoading || !departments}
      aria-label={ariaLabel || label || 'Departments'}
    >
      {label && <Label>{label}</Label>}

      <ComboBox.InputGroup>
        <Input
          placeholder={placeholder || ''}
          aria-label={ariaLabel || label || 'Departments'}
        />

        <ComboBox.Trigger>
          {isLoading ? (
            <LoaderCircle className={cn(ICON_SIZE_CLASS.sm, 'animate-spin')} />
          ) : undefined}
        </ComboBox.Trigger>
      </ComboBox.InputGroup>

      <ComboBox.Value placeholder={placeholder || ''} className="truncate" />

      <ComboBox.Popover placement="bottom">
        <ListBox selectionMode="multiple">
          {(departments || []).map((department) => (
            <ListBox.Item
              key={department.id}
              id={String(department.id)}
              textValue={department.name}
            >
              <span className="min-w-0 flex-1 truncate">{department.name}</span>

              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
};
