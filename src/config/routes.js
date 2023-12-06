import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ActiveForms, Auth, Login } from '../pages';
import Report from '../pages/Report/Report';


export const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <ActiveForms />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/verify',
        element: < Auth/>
    },
    {
        path: '/reports',
        element: < Report/>
    }
  ]);
};
