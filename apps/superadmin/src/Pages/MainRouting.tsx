import { useRoutes } from 'react-router-dom';
import Management from './Management/Management';
import Dashboard from './Dashboard/Dashboard';
import Settings from './Settings/Settings';
import { Reports } from '@cloud-equipment/reports';

export const MainRouting = () => {
  return useRoutes([
    {
      path: '',
      element: <Dashboard />,
    },
    {
      path: '/reports/*',
      element: <Reports />,
    },
    {
      path: 'management/*',
      element: <Management />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
  ]);
};
