import { useRoutes } from 'react-router-dom';
import ReportsList from './ReportsList';
import NewReport from './NewReport';
import { ViewReport } from './ViewReport';

export const ReportsRouting = () => {
  return useRoutes([
    {
      path: '',
      element: <ReportsList />,
    },
    {
      path: '/new',
      element: <NewReport />,
    },
    {
      path: '/:id',
      element: <ViewReport />,
    },
  ]);
};
