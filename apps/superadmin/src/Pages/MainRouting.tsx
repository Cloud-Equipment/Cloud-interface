import { useRoutes } from 'react-router-dom';
import Management from './Management/Management';

export const MainRouting = () => {
  return useRoutes([
    {
      path: 'management/*',
      element: <Management />,
    },
  ]);
};
