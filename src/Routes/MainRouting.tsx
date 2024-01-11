import { useRoutes } from "react-router-dom";
import Reports from "../Pages/Main/Reports/Reports";
import NewReport from "../Pages/Main/Reports/NewReport";
import UserManagement from "../Pages/Main/UserManagement/UserManagement";

export const MainRouting = () => {
  return useRoutes([
    // {
    //   path: "/",
    //   element: <Dashboard />,
    // },
    {
      path: "/reports",
      element: <Reports />,
    },
    {
      path: "/reports/new",
      element: <NewReport />,
    },
    {
      path: "/management/users",
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

