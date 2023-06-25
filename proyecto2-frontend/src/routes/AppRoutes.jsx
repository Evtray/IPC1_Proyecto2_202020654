import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainView from '../views/MainView/MainView';

// Import your components for different routes


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
