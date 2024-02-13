import { lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { Routes } from '../../routes';

const ManageFacility = lazy(() => import('./Facility/ManageFacility'));
const AddNewFacility = lazy(() => import('./Facility/AddNewFacility'));
const EditFacility = lazy(() => import('./Facility/EditFacility'));
const ViewFacility = lazy(() => import('./Facility/ViewFacility/ViewFacility'));
const Equipment = lazy(() => import('./Equipment/Equipment'));
const Patients = lazy(() => import('./Patients/Patients'));
const Discounts = lazy(() => import('./Discounts/Discounts'));
const FacilityDiscounts = lazy(() => import('./Discounts/FacilitiesList'));
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
      path: Routes.management.editFacility,
      element: <EditFacility />,
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
      path: Routes.management.discountFacility, //this should be facility
      element: <FacilityDiscounts />,
    },
    {
      path: Routes.management.discount,
      element: <Discounts />,
    },
  ]);
};
