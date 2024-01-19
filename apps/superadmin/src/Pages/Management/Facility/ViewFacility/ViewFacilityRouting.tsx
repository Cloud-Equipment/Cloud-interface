import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

const About = lazy(() => import('./About'));
const Report = lazy(() => import('./Report'));
const Staffs = lazy(() => import('./Staffs'));
const Payment = lazy(() => import('./Payment'));
const Equipment = lazy(() => import('./Equipment'));
const Tickets = lazy(() => import('./Tickets'));
const Reviews = lazy(() => import('./Reviews'));

export const ViewFacilityRouting = () => {
  return useRoutes([
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/report',
      element: <Report />,
    },
    {
      path: '/staffs',
      element: <Staffs />,
    },
    {
      path: 'payment',
      element: <Payment />,
    },
    {
      path: '/equipment',
      element: <Equipment />,
    },
    {
      path: '/tickets',
      element: <Tickets />,
    },
    {
      path: '/reviews',
      element: <Reviews />,
    },
  ]);
};
