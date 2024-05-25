// ProtectedRoute.jsx
import React from 'react';
import { useAuth } from 'C:/Users/asus/Desktop/castforeAuthContext.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated  ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
