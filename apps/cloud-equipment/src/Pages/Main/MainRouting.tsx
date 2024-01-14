import { useRoutes } from 'react-router-dom';
import Reports from './Reports/Reports';
import NewReport from './Reports/NewReport';
import UserManagement from './UserManagement/UserManagement';
import { ViewReport } from './Reports/ViewReport';

export const MainRouting = () => {
  return useRoutes([
    // {
    //   path: "/",
    //   element: <Dashboard />,
    // },
    {
      path: '/reports',
      element: <Reports />,
    },
    {
      path: '/reports/new',
      element: <NewReport />,
    },
    {
      path: '/reports/:id',
      element: <ViewReport />,
    },
    {
      path: '/management/users',
      element: <UserManagement />,
    },
    // {
    //   path: "/manage-role",
    //   element: <ManageRoles />,
    // },
    // {
    //   path: "/report-details/:id",
    //   element: <ReportDetails />,
    // },
    // {
    //   path: "/new-report",
    //   element: <ReportUploader />,
    // },
    // {
    //   path: "procedure-management",
    //   element: <ManageProceduresList />,
    // },
    // {
    //   path: "procedure-management/*",
    //   element: <ManageProceduresList />,
    // },
  ]);
};
