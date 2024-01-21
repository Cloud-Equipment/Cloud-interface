import { useRoutes } from 'react-router-dom';
import PatientsList from './PatientList';
import NewPatient from './NewPatient';
import ViewPatient from './ViewPatient';

export const PatientRouting = () => {
  return useRoutes([
    {
      path: '/',
      element: <PatientsList />,
    },
    {
      path: '/create',
      element: <NewPatient />,
    },
    {
      path: '/view/:id',
      element: <ViewPatient />,
    },
  ]);
};
