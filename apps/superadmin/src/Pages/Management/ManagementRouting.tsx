import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

import { Routes } from '../../routes';
import { PriceManagement } from '@cloud-equipment/price';
const ManageFacility = lazy(() => import('./Facility/ManageFacility'));
const AddNewFacility = lazy(() => import('./Facility/AddNewFacility'));
const ViewFacility = lazy(() => import('./Facility/ViewFacility'));

const About = lazy(() => import('./Facility/About'));
const Report = lazy(() => import('./Facility/Report'));
const Staffs = lazy(() => import('./Facility/Staffs'));
const Payment = lazy(() => import('./Facility/Payment'));
const Equipment = lazy(() => import('./Facility/Equipment'));
const Tickets = lazy(() => import('./Facility/Tickets'));
const Reviews = lazy(() => import('./Facility/Reviews'));
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
      path: Routes.management.viewFacility,
      element: <ViewFacility />,
    },
    {
      path: Routes.management.viewFacilityAbout,
      element: <About />,
    },
    {
      path: Routes.management.viewFacilityReport,
      element: <Report />,
    },
    {
      path: Routes.management.viewFacilityStaffs,
      element: <Staffs />,
    },
    {
      path: Routes.management.viewFacilityPayment,
      element: <Payment />,
    },
    {
      path: Routes.management.viewFacilityEquipments,
      element: <Equipment />,
    },
    {
      path: Routes.management.viewFacilityTickets,
      element: <Tickets />,
    },
    {
      path: Routes.management.viewFacilityReviews,
      element: <Reviews />,
    },
    {
      path: Routes.management.equipment,
      element: <ManageEquipment />,
    },
  ]);
};
