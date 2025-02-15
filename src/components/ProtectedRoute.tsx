import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
