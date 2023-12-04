import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ActiveForms, Login } from '../pages';


export const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <ActiveForms />,
    },
    {
        path: '/login',
        element: <Login />
    }
  ]);
};
