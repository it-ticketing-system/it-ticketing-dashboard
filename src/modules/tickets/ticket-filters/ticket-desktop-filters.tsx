'use client';

import { Button, Popover } from '@heroui/react';
import {
  CalendarDays,
  ChevronDown,
  LoaderCircle,
  RotateCcw,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  SelectStatus,
  SelectDepartment,
  PersianDateField,
  SearchInput,
} from '@/components/shared';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';
import {
  getDateRangeLabel,
  type TicketFiltersPatch,
  type TicketFiltersValue,
} from './types';
import type { TicketStatus } from '@/models';

type TicketDesktopFiltersProps = {
  value: TicketFiltersValue;
  isPending: boolean;
  hasActiveFilters: boolean;
  searchControl: React.ReactNode;
  onChange: (patch: TicketFiltersPatch) => void;
  onReset: () => void;
};

const TicketDesktopFilters = ({
  value,
  isPending,
  hasActiveFilters,
  searchControl,
  onChange,
  onReset,
}: TicketDesktopFiltersProps) => {
  const t = useTranslations('tickets.filters');
  const {
    status,
    department,
    support,
    user,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
  } = value;

  const handleFilterChange =
    (key: keyof TicketFiltersValue) => (val: string | null) => {
      onChange({ [key]: val });
    };

  const resetCreatedDateRange = () => {
    onChange({ createdFrom: null, createdTo: null });
  };

  const resetUpdatedDateRange = () => {
    onChange({ updatedFrom: null, updatedTo: null });
  };

  const createdDateLabel = getDateRangeLabel({
    from: createdFrom,
    to: createdTo,
    emptyLabel: t('createdDateRange.buttonLabel'),
    fromPrefix: t('dateRange.fromPrefix'),
    toPrefix: t('dateRange.toPrefix'),
  });

  const updatedDateLabel = getDateRangeLabel({
    from: updatedFrom,
    to: updatedTo,
    emptyLabel: t('updatedDateRange.buttonLabel'),
    fromPrefix: t('dateRange.fromPrefix'),
    toPrefix: t('dateRange.toPrefix'),
  });

  return (
    <section
      aria-label={t('sectionAriaLabel')}
      className="border-border bg-surface grid items-end gap-4 rounded-xl border p-4 shadow-sm lg:grid-cols-2 xl:grid-cols-4"
    >
      <div className="min-w-0 lg:col-span-2 xl:col-span-2">{searchControl}</div>

      <SelectStatus
        ariaLabel={t('status.ariaLabel')}
        placeholder={t('status.placeholder')}
        value={status as TicketStatus}
        onChange={handleFilterChange('status')}
      />

      <SelectDepartment
        ariaLabel={t('department.ariaLabel')}
        placeholder={t('department.placeholder')}
        value={department}
        onChange={handleFilterChange('department')}
      />

      <SearchInput
        ariaLabel={t('support.ariaLabel')}
        placeholder={t('support.placeholder')}
        queryValue={support || ''}
        onValueChange={handleFilterChange('support')}
        className="h-11"
        showSearchIcon={false}
      />

      <SearchInput
        ariaLabel={t('user.ariaLabel')}
        placeholder={t('user.placeholder')}
        queryValue={user || ''}
        onValueChange={handleFilterChange('user')}
        className="h-11"
        showSearchIcon={false}
      />

      <Popover>
        <Popover.Trigger>
          <Button
            variant="outline"
            size="md"
            className="border-field-border bg-field text-body-sm h-11 w-full justify-between rounded-md px-3 font-normal"
          >
            <CalendarDays
              aria-hidden="true"
              className={cn('text-muted shrink-0', ICON_SIZE_CLASS.md)}
            />
            <span className="min-w-0 flex-1 truncate">{createdDateLabel}</span>
            <ChevronDown
              aria-hidden="true"
              className={cn('text-muted shrink-0', ICON_SIZE_CLASS.sm)}
            />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          placement="bottom end"
          offset={8}
          className="border-border bg-surface rounded-xl border shadow-lg"
        >
          <Popover.Dialog dir="rtl" className="w-90 space-y-4 p-4">
            <div>
              <Popover.Heading className="text-title">
                {t('createdDateRange.heading')}
              </Popover.Heading>
              <p className="text-caption text-muted mt-1">
                {t('dateRange.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PersianDateField
                label={t('dateRange.from')}
                value={createdFrom}
                max={createdTo || undefined}
                onChange={handleFilterChange('createdFrom')}
              />
              <PersianDateField
                label={t('dateRange.to')}
                value={createdTo}
                min={createdFrom || undefined}
                onChange={handleFilterChange('createdTo')}
              />
            </div>
            {createdFrom || createdTo ? (
              <Button
                variant="ghost"
                size="sm"
                onPress={resetCreatedDateRange}
                className="text-danger h-10"
              >
                <RotateCcw aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
                {t('dateRange.clear')}
              </Button>
            ) : null}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button
            variant="outline"
            size="md"
            className="border-field-border bg-field text-body-sm h-11 w-full justify-between rounded-md px-3 font-normal"
          >
            <CalendarDays
              aria-hidden="true"
              className={cn('text-muted shrink-0', ICON_SIZE_CLASS.md)}
            />
            <span className="min-w-0 flex-1 truncate">{updatedDateLabel}</span>
            <ChevronDown
              aria-hidden="true"
              className={cn('text-muted shrink-0', ICON_SIZE_CLASS.sm)}
            />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          placement="bottom end"
          offset={8}
          className="border-border bg-surface rounded-xl border shadow-lg"
        >
          <Popover.Dialog dir="rtl" className="w-90 space-y-4 p-4">
            <div>
              <Popover.Heading className="text-title">
                {t('updatedDateRange.heading')}
              </Popover.Heading>
              <p className="text-caption text-muted mt-1">
                {t('dateRange.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PersianDateField
                label={t('dateRange.from')}
                value={updatedFrom}
                max={updatedTo || undefined}
                onChange={handleFilterChange('updatedFrom')}
              />
              <PersianDateField
                label={t('dateRange.to')}
                value={updatedTo}
                min={updatedFrom || undefined}
                onChange={handleFilterChange('updatedTo')}
              />
            </div>
            {updatedFrom || updatedTo ? (
              <Button
                variant="ghost"
                size="sm"
                onPress={resetUpdatedDateRange}
                className="text-danger h-10"
              >
                <RotateCcw aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
                {t('dateRange.clear')}
              </Button>
            ) : null}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <div className="flex justify-end lg:col-span-2 xl:col-span-4">
        <Button
          variant="outline"
          size="md"
          isDisabled={!hasActiveFilters}
          isPending={isPending}
          onPress={onReset}
          className="border-field-border bg-surface h-11 w-[160px] rounded-md"
        >
          {isPending ? (
            <LoaderCircle
              aria-hidden="true"
              className={cn(ICON_SIZE_CLASS.sm, 'animate-spin')}
            />
          ) : (
            <RotateCcw aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          )}
          {t('actions.reset')}
        </Button>
      </div>
    </section>
  );
};

export default TicketDesktopFilters;
