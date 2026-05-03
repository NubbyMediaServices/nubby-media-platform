import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/client/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-sm text-neutral-300">Loading secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}