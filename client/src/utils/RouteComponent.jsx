import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from './AuthContext';

// export const ProtectedRoute = ({ children, adminRequired = false }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

//   if (adminRequired && !user.isAdmin) {
//     return <Navigate to="/home" replace />;
//   }

//   return children;
// };

// export const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (user) {
//     return <Navigate to={user.isAdmin ? '/admin-dashboard' : '/home'} replace />;
//   }

//   return children;
// };

export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  
    if (adminOnly && !user.isAdmin) {
      return <Navigate to="/home" replace />;
    }
  
    if (!adminOnly && user.isAdmin) {
      return <Navigate to="/admin-dashboard" replace />;
    }
  
    return children;
  };
  
  export const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (user) {
      return <Navigate to={user.isAdmin ? '/admin-dashboard' : '/home'} replace />;
    }
  
    return children;
  };