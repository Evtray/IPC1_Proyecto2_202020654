import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainView from '../views/MainView/MainView';
import LoginView from '../views/LoginView/LoginView';
import SignUpView from '../views/SignUpView/SignUpView';

// Import your components for different routes


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
