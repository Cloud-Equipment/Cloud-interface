import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

import { Routes } from '../../routes';
import { PriceManagement } from '@cloud-equipment/price';
const ManageFacility = lazy(() => import('./Facility/ManageFacility'));
const AddNewFacility = lazy(() => import('./Facility/AddNewFacility'));
const ManageEquipment = lazy(() => import('./Equipment/Equipment'));

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
      path: Routes.management.equipment,
      element: <ManageEquipment />,
    },
  ]);
};
