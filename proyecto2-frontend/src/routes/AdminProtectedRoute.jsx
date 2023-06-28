import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = () => {
    const isAuthenticated = useSelector(state => state.loggedIn);
    const AUTH = useSelector(state => state.auth);
    if (!isAuthenticated && !AUTH?.user?.is_admin) {
      return <Navigate to={'/dashboard'} replace />;
    }
    return <Outlet />
};

export default AdminProtectedRoute;
