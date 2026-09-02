'use client';

import { Button } from '@heroui/react';
import { Plus } from 'lucide-react';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';

type ToolbarAddButtonProps = {
  label: string;
  onPress: () => void;
};

const ToolbarAddButton = ({ label, onPress }: ToolbarAddButtonProps) => {
  return (
    <>
      <Button
        variant="primary"
        isIconOnly
        onPress={onPress}
        aria-label={label}
        className={cn('h-11 w-11 min-w-11 shrink-0 rounded-md px-0 lg:hidden')}
      >
        <Plus aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
      </Button>

      <Button
        variant="primary"
        onPress={onPress}
        className="hidden lg:inline-flex"
      >
        <span className="flex items-center gap-2">
          <Plus aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          <span>{label}</span>
        </span>
      </Button>
    </>
  );
};

export default ToolbarAddButton;
