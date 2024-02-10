import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

import UserManagement from './UserManagement/UserManagement';
import PriceManagement from './Price/PriceManagement';

const ViewPatients = lazy(
  () => import('../../Pages/Management/Patients/ViewPatients')
);
const AddPatient = lazy(
  () => import('../../Pages/Management/Patients/AddPatient')
);
const ViewPatient = lazy(
  () => import('../../Pages/Management/Patients/ViewPatient')
);

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
    {
      path: '/patients',
      element: <ViewPatients />,
    },
    {
      path: '/add-patient',
      element: <AddPatient />,
    },
    {
      path: '/patient/:id',
      element: <ViewPatient />,
    },
    {
      path: '/manage-user',
      element: <ViewPatient />,
    },
  ]);
};
