import { Skeleton } from "@/components/ui/skeleton";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (isInitializing) {
    return (
      <div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requireAdmin) {
    if (adminLoading) {
      return (
        <div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
    }
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
