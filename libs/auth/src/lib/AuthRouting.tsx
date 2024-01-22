import { Navigate, useRoutes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';

export const AuthRouting = () => {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="login" />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);
};
