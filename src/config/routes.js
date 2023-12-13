import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ActiveForms, Auth, Login } from '../pages';
import Report from '../pages/Report/Report';
import ManageUser from '../pages/ManageUsers/ManageUser';
import ManageRoles from '../pages/ManageUsers/ManageRoles';


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
    },
    {
        path: '/manage-user',
        element: < ManageUser/>
    },
    {
        path: '/manage-role',
        element: < ManageRoles/>
    }
  ]);
};
