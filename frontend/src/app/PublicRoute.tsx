import { useAppSelector } from "@/hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";


const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.user.isAuthenticated,
  );

  if (isAuthenticated) {

    return <Navigate to="/" replace />;
    
  }

  return children;
};

export default PublicRoute;
