import { useRoutes } from 'react-router-dom';
import { Auth } from '@cloud-equipment/auth';
import { Main } from './Pages/Main';

export const AppRouting = () => {
  return useRoutes([
    { path: '/auth/*', element: <Auth /> },
    {
      path: '/*',
      element: <Main />,
    },
  ]);
};
