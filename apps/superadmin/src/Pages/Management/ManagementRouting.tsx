import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

import { Routes } from '../../routes';
import PriceManagement from './Price/PriceManagement';
const ManageFacility = lazy(() => import('./Facility/ManageFacility'));
const AddNewFacility = lazy(() => import('./Facility/AddNewFacility'));

export const ManagementRouting = () => {
  return useRoutes([
    {
      path: 'price',
      element: <PriceManagement />,
    },
    {
      path: 'price/approved',
      element: <PriceManagement />,
    },
    {
      path: 'price/pending',
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
  ]);
};
