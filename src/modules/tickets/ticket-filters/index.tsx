'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/hooks';
import TicketSearchControl from './ticket-search-control';
import {
  createTicketFilterPatch,
  type TicketFiltersPatch,
  type TicketFiltersValue,
} from './types';
import type { IDepartmentLookup, TicketStatus } from '@/models';

const TicketMobileFilters = dynamic(() => import('./ticket-mobile-filters'), {
  ssr: false,
});

const TicketDesktopFilters = dynamic(() => import('./ticket-desktop-filters'), {
  ssr: false,
});

type MyTicketsFiltersProps = {
  departments: IDepartmentLookup[];
  value: TicketFiltersValue;
  isPending: boolean;
  onChange: (patch: TicketFiltersPatch) => void;
  onReset: () => void;
};

const MyTicketsFilters = ({
  departments,
  value,
  isPending,
  onChange,
  onReset,
}: MyTicketsFiltersProps) => {
  const t = useTranslations('tickets.filters');
  const { isDesktop } = useMediaQuery();
  const {
    search,
    status,
    department,
    support,
    user,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
  } = value;

  const statusOptions: readonly SelectOption<TicketStatus>[] = [
    { value: 'open', label: t('statuses.open') },
    { value: 'inProgress', label: t('statuses.inProgress') },
    { value: 'waitingUser', label: t('statuses.waitingUser') },
    { value: 'resolved', label: t('statuses.resolved') },
    { value: 'closed', label: t('statuses.closed') },
  ];

  const departmentOptions = departments.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const activeFilterCount =
    Number(Boolean(status)) +
    Number(Boolean(department)) +
    Number(Boolean(support)) +
    Number(Boolean(user)) +
    Number(Boolean(createdFrom || createdTo)) +
    Number(Boolean(updatedFrom || updatedTo));

  const hasActiveFilters = Boolean(search) || activeFilterCount > 0;

  const searchControl = (
    <TicketSearchControl
      querySearch={search}
      onSearchChange={(nextSearch) => {
        onChange(createTicketFilterPatch('search', nextSearch));
      }}
      className="min-w-0"
    />
  );

  if (isDesktop === null) {
    return (
      <>
        <section
          aria-hidden="true"
          className="flex items-center gap-3 lg:hidden"
        >
          <div className="border-border bg-primary-50 h-11 min-w-0 flex-1 rounded-md border animate-pulse" />
          <div className="border-border bg-primary-50 size-11 shrink-0 rounded-md border animate-pulse" />
        </section>

        <section
          aria-hidden="true"
          className="border-border bg-surface hidden gap-4 rounded-xl border p-4 shadow-sm lg:grid lg:grid-cols-2 xl:grid-cols-4"
        >
          <div className="border-border bg-primary-50 h-11 rounded-md border animate-pulse lg:col-span-2 xl:col-span-2" />
          <div className="border-border bg-primary-50 h-11 rounded-md border animate-pulse" />
          <div className="border-border bg-primary-50 h-11 rounded-md border animate-pulse" />
          <div className="border-border bg-primary-50 h-11 rounded-md border animate-pulse" />
          <div className="border-border bg-primary-50 h-11 rounded-md border animate-pulse" />
          <div className="border-border bg-primary-50 h-11 rounded-md border animate-pulse" />
          <div className="border-border bg-primary-50 h-11 rounded-md border animate-pulse" />
          
          <div className="flex justify-end lg:col-span-2 xl:col-span-4 mt-1">
            <div className="border-border bg-primary-50 h-11 w-[160px] rounded-md border animate-pulse" />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {!isDesktop && (
        <section aria-label={t('sectionAriaLabel')}>
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">{searchControl}</div>

            <TicketMobileFilters
              status={status}
              department={department}
              support={support}
              user={user}
              createdFrom={createdFrom}
              createdTo={createdTo}
              updatedFrom={updatedFrom}
              updatedTo={updatedTo}
              activeFilterCount={activeFilterCount}
              departmentOptions={departmentOptions}
              isPending={isPending}
              statusOptions={statusOptions}
              onApplyFilters={onChange}
            />
          </div>
        </section>
      )}

      {isDesktop && (
        <TicketDesktopFilters
          value={value}
          statusOptions={statusOptions}
          departmentOptions={departmentOptions}
          isPending={isPending}
          hasActiveFilters={hasActiveFilters}
          searchControl={searchControl}
          onChange={onChange}
          onReset={onReset}
        />
      )}
    </>
  );
};

export default MyTicketsFilters;
