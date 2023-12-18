import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ActiveForms, Auth, Login, Report, ManageUser, ManageRoles, ReportDetails, ReportUploader } from '../pages';


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
      element: < Auth />
    },
    {
      path: '/reports',
      element: < Report />
    },
    {
      path: '/manage-user',
      element: < ManageUser />
    },
    {
      path: '/manage-role',
      element: < ManageRoles />
    },
    {
      path: '/report-details',
      element: < ReportDetails />
    },
    {
      path: '/new-report',
      element: < ReportUploader />
    }
  ]);
};
