'use client';

import { Tabs } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { SelectDepartment, SelectSupport } from '@/components/shared';
import type { ReportsFiltersValue } from './reports-query';
import type { ReportRange } from '@/models';

const RANGE_OPTIONS: ReportRange[] = ['today', 'week', 'month', 'year'];

type ReportFilterFieldsProps = {
  filters: ReportsFiltersValue;
  onChange: (nextFilters: ReportsFiltersValue) => void;
};

const ReportFilterFields = ({
  filters,
  onChange,
}: ReportFilterFieldsProps) => {
  const t = useTranslations('reports');

  return (
    <>
      <Tabs
        selectedKey={filters.range}
        onSelectionChange={(key) =>
          onChange({
            ...filters,
            range: key as ReportRange,
          })
        }
        variant="secondary"
        aria-label={t('filters.range.ariaLabel')}
      >
        <Tabs.List className="grid w-full grid-cols-4">
          {RANGE_OPTIONS.map((range) => (
            <Tabs.Tab key={range} id={range} className="justify-center">
              {t(`ranges.${range}`)}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <SelectDepartment
        label={t('filters.department.label')}
        placeholder={t('filters.department.placeholder')}
        ariaLabel={t('filters.department.ariaLabel')}
        value={filters.department}
        onChange={(department) =>
          onChange({
            ...filters,
            department: department || '',
            support: '',
          })
        }
        emptyOptionLabel={t('filters.department.allOption')}
      />

      <SelectSupport
        label={t('filters.support.label')}
        placeholder={t('filters.support.placeholder')}
        ariaLabel={t('filters.support.ariaLabel')}
        departmentId={filters.department}
        value={filters.support}
        onChange={(support) =>
          onChange({
            ...filters,
            support: support || '',
          })
        }
        emptyOptionLabel={t('filters.support.allOption')}
      />
    </>
  );
};

export default ReportFilterFields;
