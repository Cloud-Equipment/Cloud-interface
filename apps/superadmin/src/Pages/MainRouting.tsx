import { useRoutes } from 'react-router-dom';
import Management from './Management/Management';
import Dashboard from './Dashboard/Dashboard';
import Settings from './Settings/Settings';

export const MainRouting = () => {
  return useRoutes([
    {
      path: '',
      element: <Dashboard />,
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
