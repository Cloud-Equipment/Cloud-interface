import { useRoutes } from 'react-router-dom';
import { Reports } from '@cloud-equipment/reports';
import UserManagement from './UserManagement/UserManagement';
import { PriceManagement } from '@cloud-equipment/price';

export const MainRouting = () => {
  return useRoutes([
    // {
    //   path: "/",
    //   element: <Dashboard />,
    // },
    {
      path: '/reports/*',
      element: <Reports />,
    },
    {
      path: '/management/users',
      element: <UserManagement />,
    },
    {
      path: '/price',
      element: <PriceManagement />,
    },
    {
      path: '/price/approved',
      element: <PriceManagement />,
    },
    {
      path: '/price/pending',
      element: <PriceManagement />,
    },
  ]);
};
