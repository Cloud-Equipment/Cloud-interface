import { Navigate, useRoutes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';

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
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
  ]);
};
