'use client';

import { Skeleton } from '@heroui/react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { SearchInput } from '@/components/shared';
import { useMediaQuery } from '@/hooks';
import {
  createTicketFilterPatch,
  type TicketFiltersPatch,
  type TicketFiltersValue,
} from './types';

const TicketMobileFilters = dynamic(() => import('./ticket-mobile-filters'), {
  ssr: false,
});

const TicketDesktopFilters = dynamic(() => import('./ticket-desktop-filters'), {
  ssr: false,
});

type MyTicketsFiltersProps = {
  value: TicketFiltersValue;
  isPending: boolean;
  onChange: (patch: TicketFiltersPatch) => void;
};

const MyTicketsFilters = ({
  value,
  isPending,
  onChange,
}: MyTicketsFiltersProps) => {
  const t = useTranslations('tickets.filters');
  const { isDesktop } = useMediaQuery();
  const { search, status, department, support, user, createdFrom, createdTo } =
    value;

  const activeFilterCount =
    Number(Boolean(status)) +
    Number(Boolean(department)) +
    Number(Boolean(support)) +
    Number(Boolean(user)) +
    Number(Boolean(createdFrom || createdTo));

  const searchControl = (
    <SearchInput
      queryValue={search || ''}
      onValueChange={(nextSearch) => {
        onChange(createTicketFilterPatch('search', nextSearch));
      }}
      className="h-11 min-w-0"
      placeholder={t('search.placeholder')}
      ariaLabel={t('search.ariaLabel')}
      showSearchIcon
    />
  );

  if (isDesktop === null) {
    return (
      <>
        <section
          aria-hidden="true"
          className="flex items-center gap-3 lg:hidden"
        >
          <Skeleton className="border-border h-11 min-w-0 flex-1 rounded-md border" />
          <Skeleton className="border-border size-11 shrink-0 rounded-md border" />
        </section>

        <section
          aria-hidden="true"
          className="border-border bg-surface hidden gap-4 rounded-xl border p-4 shadow-sm lg:grid lg:grid-cols-2 xl:grid-cols-4"
        >
          <Skeleton className="border-border h-11 rounded-md border lg:col-span-2 xl:col-span-2" />
          <Skeleton className="border-border h-11 rounded-md border" />
          <Skeleton className="border-border h-11 rounded-md border" />
          <Skeleton className="border-border h-11 rounded-md border" />
          <Skeleton className="border-border h-11 rounded-md border" />
          <Skeleton className="border-border h-11 rounded-md border" />
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
              status={status || ''}
              department={department || ''}
              support={support || ''}
              user={user || ''}
              createdFrom={createdFrom || ''}
              createdTo={createdTo || ''}
              activeFilterCount={activeFilterCount}
              isPending={isPending}
              onApplyFilters={onChange}
            />
          </div>
        </section>
      )}

      {isDesktop && (
        <TicketDesktopFilters
          value={value}
          searchControl={searchControl}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default MyTicketsFilters;
