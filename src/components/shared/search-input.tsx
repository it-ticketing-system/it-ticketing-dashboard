'use client';

import { SearchField, Label } from '@heroui/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useDebounce } from '@/hooks';
import { cn } from '@/utils';
import { useTranslations } from 'next-intl';

interface SearchInputProps {
  queryValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
  showSearchIcon?: boolean;
}

export const SearchInput = ({
  queryValue,
  onValueChange,
  placeholder,
  label,
  ariaLabel,
  className,
  showSearchIcon = false,
}: SearchInputProps) => {
  const [value, setValue] = useState(queryValue);
  const debouncedValue = useDebounce(value.trim());
  const lastRequestedValueRef = useRef(queryValue);
  const skipDebouncedUpdateRef = useRef(false);
  const tCommon = useTranslations('common');

  useEffect(() => {
    if (queryValue === lastRequestedValueRef.current) {
      return;
    }

    skipDebouncedUpdateRef.current = true;
    lastRequestedValueRef.current = queryValue;
    setValue(queryValue);
  }, [queryValue]);

  useEffect(() => {
    if (skipDebouncedUpdateRef.current) {
      skipDebouncedUpdateRef.current = false;
      return;
    }

    if (debouncedValue === queryValue) {
      return;
    }

    lastRequestedValueRef.current = debouncedValue;
    onValueChange(debouncedValue);
  }, [debouncedValue, onValueChange, queryValue]);

  return (
    <SearchField
      aria-label={label ? undefined : ariaLabel}
      value={value}
      onChange={setValue}
      variant="secondary"
      className={cn('w-full', className)}
    >
      {label && <Label>{label}</Label>}
      <SearchField.Group>
        {showSearchIcon && <SearchField.SearchIcon />}
        <SearchField.Input placeholder={placeholder} />
        <SearchField.ClearButton aria-label={tCommon('search.clearAriaLabel')} />
      </SearchField.Group>
    </SearchField>
  );
};
