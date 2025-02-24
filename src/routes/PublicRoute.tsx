// PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { role } = useAuth();
  if (role) {
    // Redireciona para o dashboard do usuário ou da empresa, conforme o caso
    return (
      <Navigate
        to={role === "user" ? "/user/dashboard" : "/company/dashboard"}
        replace
      />
    );
  }
  return <>{children}</>;
};

export default PublicRoute;
