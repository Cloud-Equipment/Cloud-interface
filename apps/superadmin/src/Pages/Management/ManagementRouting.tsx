import { lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { Routes } from '../../routes';

const ManageFacility = lazy(() => import('./Facility/ManageFacility'));
const AddNewFacility = lazy(() => import('./Facility/AddNewFacility'));
const ViewFacility = lazy(() => import('./Facility/ViewFacility/ViewFacility'));
const Equipment = lazy(() => import('./Equipment/Equipment'));
const Patients = lazy(() => import('./Patients/Patients'));
const Discounts = lazy(() => import('./Discounts/Discounts'));
const Medservices = lazy(() => import('./Medservices/Medservices'));

export const ManagementRouting = () => {
  return useRoutes([
    {
      path: '',
      element: <Navigate to="patients" />,
    },
    {
      path: 'medservices/*',
      element: <Medservices />,
    },
    {
      path: Routes.management.manageFacility,
      element: <ManageFacility />,
    },
    {
      path: Routes.management.addFacility,
      element: <AddNewFacility />,
    },
    {
      path: Routes.management.viewFacility,
      element: <ViewFacility />,
    },
    {
      path: Routes.management.equipment,
      element: <Equipment />,
    },
    {
      path: Routes.management.patient,
      element: <Patients />,
    },
    {
      path: Routes.management.discount,
      element: <Discounts />,
    },
  ]);
};
