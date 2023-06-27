import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ redirectPath = '/',  }) => {
    const isAuthenticated = useSelector(state => state.loggedIn);
    if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />
};

export default ProtectedRoute;
