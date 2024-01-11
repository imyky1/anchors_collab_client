import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, navigateCondition, toUrl }) => {
  if (navigateCondition) {
    return <Navigate to={toUrl} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
