import { useRoutes } from 'react-router-dom';
import MedservicesList from './children/MedservicesList';
import MedcategoriesList from './children/MedcategoriesList';

export const MedserviceRouting = () => {
  return useRoutes([
    { path: '', element: <MedservicesList /> },
    { path: '/categories', element: <MedcategoriesList /> },
  ]);
};
