import { useRoutes } from "react-router-dom";
import { Main } from "../Pages/Main/Main";

export const AppRoutes = () => {
  return useRoutes([
    {
      path: "/*",
      element: <Main />,
    },
  ]);
};
