import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { userHasRole, UserRole } from "../../services/authService";

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  loginPath?: string;
  unauthorizedPath?: string;
}

export default function RoleProtectedRoute({
  children,
  allowedRoles,
  loginPath = "/client/login",
  unauthorizedPath = "/",
}: RoleProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-cream">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5">
          <p className="text-sm text-muted">Checking secure session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (!userHasRole(user, allowedRoles)) {
    return <Navigate to={unauthorizedPath} replace />;
  }

  return <>{children}</>;
}
