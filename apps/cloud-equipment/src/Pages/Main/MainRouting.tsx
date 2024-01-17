import { useRoutes } from 'react-router-dom';
import Reports from './Reports/Reports';
import NewReport from './Reports/NewReport';
import UserManagement from './UserManagement/UserManagement';
import { ViewReport } from './Reports/ViewReport';
import { PriceManagement } from '@cloud-equipment/price';

export const MainRouting = () => {
  return useRoutes([
    // {
    //   path: "/",
    //   element: <Dashboard />,
    // },
    {
      path: '/reports',
      element: <Reports />,
    },
    {
      path: '/reports/new',
      element: <NewReport />,
    },
    {
      path: '/reports/:id',
      element: <ViewReport />,
    },
    {
      path: '/management/users',
      element: <UserManagement />,
    },
    {
      path: 'price',
      element: <PriceManagement />,
    },
    {
      path: 'price/approved',
      element: <PriceManagement />,
    },
    {
      path: 'price/pending',
      element: <PriceManagement />,
    },
  ]);
};
