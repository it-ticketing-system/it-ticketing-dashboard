import { Suspense } from 'react';
import DashboardOverviewClient from './dashboard-overview-client';
import DashboardOverviewClientFallback from './skeleton/dashboard-overview-skeletons';

const DashboardOverviewModule = () => {
  return (
    <Suspense fallback={<DashboardOverviewClientFallback />}>
      <DashboardOverviewClient />
    </Suspense>
  );
};

export default DashboardOverviewModule;
