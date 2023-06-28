import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainView from '../views/MainView/MainView';
import LoginView from '../views/LoginView/LoginView';
import SignUpView from '../views/SignUpView/SignUpView';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import DashboardView from '../views/DashboardView/DashboardView';
import MainMenu from '../components/mainMenu/MainMenu';
import RecoverPasswordView from '../views/RecoverPasswordView/RecoverPassword';
import CreateMovieView from '../views/CreateMovieView/CreateMovieView';
import EditMovieView from '../views/EditMovieView/EditMovieView';

const AppRoutes = () => {
  return (
    <Router>
      <MainMenu /> 
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/recover-password" element={<RecoverPasswordView />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardView />} />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/create-movie" element={<CreateMovieView />} />
          <Route path="/edit-movie/:id" element={<EditMovieView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
