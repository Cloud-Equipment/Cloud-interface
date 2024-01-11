import { useRoutes } from "react-router-dom";
import { Main } from "../Pages/Main/Main";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Auth from "../Pages/Auth/Auth";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/auth/*", element: <Auth /> },
    {
      path: "/*",
      element: <Main />,
    },
  ]);
};
