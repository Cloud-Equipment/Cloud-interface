import React from "react";
import { useRoutes } from "react-router-dom";
import {
  ActiveForms,
  Auth,
  Login,
  Report,
  ManageUser,
  ManageRoles,
  ReportDetails,
  ReportUploader,
} from "../pages";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Main } from "../pages/Main/Main";
import { ManageProceduresList } from "../pages/ManageProcedures/ManageProceduresList";

export const Routes = () => {
  return useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify",
      element: <Auth />,
    },
    { path: "/*", element: <Main /> },
  ]);
};

export const MainRouting = () => {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/create-report-form",
      element: <ActiveForms />,
    },
    {
      path: "/reports",
      element: <Report />,
    },
    {
      path: "/manage-user",
      element: <ManageUser />,
    },
    {
      path: "/manage-role",
      element: <ManageRoles />,
    },
    {
      path: "/report-details/:id",
      element: <ReportDetails />,
    },
    {
      path: "/new-report",
      element: <ReportUploader />,
    },
    {
      path: "procedure-management",
      element: <ManageProceduresList />,
    },
    {
      path: "procedure-management/*",
      element: <ManageProceduresList />,
    },
  ]);
};
