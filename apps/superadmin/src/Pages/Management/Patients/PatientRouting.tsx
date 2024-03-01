import { useRoutes } from 'react-router-dom';
import PatientsList from './PatientList';
import NewPatient from './NewPatient';
import ViewPatient from './ViewPatient';
import FacilitiesList from './FacilitiesList';

export const PatientRouting = () => {
  return useRoutes([
    {
      path: '/',
      element: <FacilitiesList />,
    },
    {
      path: '/facilities/:id/patients',
      element: <PatientsList />,
    },
    {
      path: '/facilities/:id/patients/create',
      element: <NewPatient />,
    },
    {
      path: '/view/:id',
      element: <ViewPatient />,
    },
  ]);
};
