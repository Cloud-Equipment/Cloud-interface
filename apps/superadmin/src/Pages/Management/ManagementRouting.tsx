import { useRoutes } from 'react-router-dom';
import PriceManagement from './Price/PriceManagement';

export const ManagementRouting = () => {
  return useRoutes([
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
