'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/hooks';
import { SearchInput } from '@/components/shared';
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
  onReset: () => void;
};

const MyTicketsFilters = ({
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

  const activeFilterCount =
    Number(Boolean(status)) +
    Number(Boolean(department)) +
    Number(Boolean(support)) +
    Number(Boolean(user)) +
    Number(Boolean(createdFrom || createdTo)) +
    Number(Boolean(updatedFrom || updatedTo));

  const hasActiveFilters = Boolean(search) || activeFilterCount > 0;

  const searchControl = (
    <SearchInput
      queryValue={search || ''}
      onValueChange={(nextSearch) => {
        onChange(createTicketFilterPatch('search', nextSearch));
      }}
      className="min-w-0 h-11"
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
                status={status || ''}
                department={department || ''}
                support={support || ''}
                user={user || ''}
                createdFrom={createdFrom || ''}
                createdTo={createdTo || ''}
                updatedFrom={updatedFrom || ''}
                updatedTo={updatedTo || ''}
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
