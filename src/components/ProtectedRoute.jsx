import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../utils/db';

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = getLoggedInUser();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, check if role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}
