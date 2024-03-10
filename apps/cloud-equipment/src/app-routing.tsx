import { Navigate, useRoutes } from 'react-router-dom';
import { Auth } from '@cloud-equipment/auth';
import { Main } from './Pages/Main';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from './Store/store';
import { useEffect } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { clearLoading, setLoading } from '@cloud-equipment/shared_store';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: IAppState) => state.auth.user);
  return isAuthenticated ? <Main /> : <Navigate to="/auth/login" />;
};

export const AppRouting = () => {
  const isFetching = useIsFetching();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching) {
      // dispatch(setLoading());
    } else {
      // dispatch(clearLoading());
    }
  }, [isFetching]);

  return useRoutes([
    { path: '/auth/*', element: <Auth /> },
    {
      path: '/*',
      element: <ProtectedRoute />,
    },
  ]);
};
