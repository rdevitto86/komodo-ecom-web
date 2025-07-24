import { Navigate, useLocation } from 'react-router-dom';

type AuthGuardProps = {
  children: JSX.Element;
  isAuthenticated: boolean;
}

export default function AuthGuard({ children, isAuthenticated }: AuthGuardProps) {
  const location = useLocation();
  return (!isAuthenticated) ? <Navigate to="/" state={{ from: location }} replace /> : children;
}
