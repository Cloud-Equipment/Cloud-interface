import { useRoutes } from 'react-router-dom';
import UserManagement from './UserManagement/UserManagement';
import PriceManagement from './Price/PriceManagement';

export const ManagementRouting = () => {
  return useRoutes([
    {
      path: '/users',
      element: <UserManagement />,
    },
    {
      path: '/medservices',
      element: <PriceManagement />,
    },
    {
      path: '/medservices/approved',
      element: <PriceManagement />,
    },
    {
      path: '/medservices/pending',
      element: <PriceManagement />,
    },
  ]);
};
