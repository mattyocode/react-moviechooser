import React from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.auth);
  const location = useLocation();

  if (user.account) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
}
