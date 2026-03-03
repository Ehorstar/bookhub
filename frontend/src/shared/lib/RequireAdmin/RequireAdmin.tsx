import { Navigate, Outlet } from "react-router-dom";
import {
  useGetStatusQuery,
  useIsAdminQuery,
} from "../../../features/auth/api/auth.api";

export function RequireAdmin() {
  const { data, isLoading } = useGetStatusQuery();
  const { data: isAdmin } = useIsAdminQuery();

  if (isLoading) return null;

  if (!data?.isAuthenticated) return <Navigate to="/" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
