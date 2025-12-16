import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken } from "../lib/api";

export default function RequireAuth({ children }) {
  const token = getAuthToken();
  const location = useLocation();

  if (!token) {
    // Redirect to login but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}