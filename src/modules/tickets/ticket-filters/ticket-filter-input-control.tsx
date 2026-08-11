'use client';

import { Input } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks';

type TicketFilterInputControlProps = {
  label: string;
  ariaLabel: string;
  placeholder: string;
  queryValue: string;
  onValueChange: (value: string) => void;
  className?: string;
};

const TicketFilterInputControl = ({
  label,
  ariaLabel,
  placeholder,
  queryValue,
  onValueChange,
  className,
}: TicketFilterInputControlProps) => {
  const [value, setValue] = useState(queryValue);
  const debouncedValue = useDebounce(value.trim());
  const lastRequestedValueRef = useRef(queryValue);
  const skipDebouncedUpdateRef = useRef(false);

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
    <div className="flex flex-col gap-1.5">
      <span className="text-body-sm text-foreground font-medium">{label}</span>
      <Input
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={className}
      />
    </div>
  );
};

export default TicketFilterInputControl;
