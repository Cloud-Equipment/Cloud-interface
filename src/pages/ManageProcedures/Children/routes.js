import { useRoutes } from "react-router-dom";
import { AllProcedures } from "./AllProcedures";
import { PendingProcedures } from "./PendingProcedures";
import { ApprovedProcedures } from "./ApprovedProcedures";

export const ManageProceduresChildRoutes = () => {
  return useRoutes([
    { path: "/", element: <AllProcedures /> },
    {
      path: "/pending",
      element: <PendingProcedures />,
    },
    {
      path: "/approved",
      element: <ApprovedProcedures />,
    },
  ]);
};
