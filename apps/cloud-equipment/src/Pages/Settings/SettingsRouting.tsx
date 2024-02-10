import { lazy } from 'react';

import { useRoutes, Navigate } from 'react-router-dom';

const Settings = lazy(() => import('./GeneralSettings'));
const Security = lazy(() => import('./Security'));

export const SettingsRouting = () => {
  return useRoutes([
    {
      path: '',
      element: <Navigate to="general" />,
    },
    {
      path: 'general',
      element: <Settings />,
    },
    {
      path: 'security',
      element: <Security />,
    },
  ]);
};
