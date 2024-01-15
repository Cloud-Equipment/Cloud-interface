
import { ReactNode } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  element,
  redirectPath,
}) => {
  return isAuthenticated ? <>{element}</> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
