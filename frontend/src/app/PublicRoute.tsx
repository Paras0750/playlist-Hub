import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react/jsx-dev-runtime";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
