import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

import { Routes } from '../../routes';
import { PriceManagement } from '@cloud-equipment/price';
// import ViewFacility from "./Facility/ViewFacility";
const ManageFacility = lazy(() => import('./Facility/ManageFacility'));
const AddNewFacility = lazy(() => import('./Facility/AddNewFacility'));
const ViewFacility = lazy(() => import('./Facility/ViewFacility/ViewFacility'));
const Equipment = lazy(() => import('./Equipment/Equipment'));

export const ManagementRouting = () => {
  return useRoutes([
    {
      path: 'medservices',
      element: <PriceManagement />,
    },
    {
      path: 'medservices/approved',
      element: <PriceManagement />,
    },
    {
      path: 'medservices/pending',
      element: <PriceManagement />,
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
  ]);
};
