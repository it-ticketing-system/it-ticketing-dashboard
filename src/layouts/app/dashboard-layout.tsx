'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ICON_SIZE_CLASS } from '@/constants';
import { cn } from '@/utils';
import { DashboardHeader } from './header/dashboard-header';
import { DashboardSidebar } from './sidebar/dashboard-sidebar';

export const DashboardLayout: FCC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const tHeader = useTranslations('mainLayout.header');

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="bg-background dir-rtl flex h-dvh w-full overflow-hidden text-neutral-900">
      <aside
        className={cn(
          'bg-surface hidden h-full shrink-0 border-e border-neutral-200/80 transition-all duration-300 ease-in-out lg:flex',
          collapsed ? 'w-20' : 'w-64',
        )}
      >
        <DashboardSidebar collapsed={collapsed} />
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-50 flex transition-all duration-300 lg:hidden',
          mobileSidebarOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <div
          className={cn(
            'fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity duration-300 ease-in-out',
            mobileSidebarOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />

        <div
          className={cn(
            'bg-surface relative flex h-full w-72 flex-col shadow-xl transition-transform duration-300 ease-in-out',
            mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="absolute top-4 left-4 z-10">
            <button
              type="button"
              onClick={closeMobileSidebar}
              className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:text-neutral-900"
              aria-label={tHeader('closeMenu')}
            >
              <X className={ICON_SIZE_CLASS.md} />
            </button>
          </div>

          <DashboardSidebar onNavigate={closeMobileSidebar} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
          onToggleMobileSidebar={toggleMobileSidebar}
        />

        <main className="min-h-0 flex-1 overflow-y-auto bg-neutral-50 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
