import { useRoutes } from 'react-router-dom';
import MedservicesList from './children/MedservicesList';
import MedcategoriesList from './children/MedcategoriesList';
import PriceChangeRequest from './children/PriceChangeRequest';
import FacilitiesList from './FacilitiesList';

export const MedserviceRouting = () => {
  return useRoutes([
    { path: '', element: <FacilitiesList /> },
    { path: '/facilities/:id', element: <MedservicesList /> },
    { path: '/categories', element: <MedcategoriesList /> },
    { path: '/price-change-request/:id', element: <PriceChangeRequest /> },
  ]);
};
