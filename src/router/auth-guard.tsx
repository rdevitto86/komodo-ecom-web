import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}

export function AuthGuard({ children, isAuthenticated }: AuthGuardProps) {
  const location = useLocation();
  return (!isAuthenticated)
    ? <Navigate to="/" state={{ from: location }} replace />
    : children;
}
