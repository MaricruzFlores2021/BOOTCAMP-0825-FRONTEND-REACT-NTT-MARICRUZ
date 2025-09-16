import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ComponentType, JSX } from 'react';

export function withAuth<P extends JSX.IntrinsicAttributes>(
  Component: ComponentType<P>
) {
  return (props: P) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Component {...props} />;
  };
}
