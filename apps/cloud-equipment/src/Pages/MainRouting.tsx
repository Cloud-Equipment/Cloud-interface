import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';
import { Reports } from '@cloud-equipment/reports';
import Management from './Management/Management';
import Dashboard from './Dashboard/Dashboard';

const Settings = lazy(() => import('./Settings'));

export const MainRouting = () => {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: '/reports/*',
      element: <Reports />,
    },
    {
      path: '/management/*',
      element: <Management />,
    },
    {
      path: '/settings/*',
      element: <Settings />,
    },
  ]);
};
