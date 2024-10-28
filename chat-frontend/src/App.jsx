import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessegeUser from './pages/MessegeUser';
import MessegeGroup from './pages/MessegeGroup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/messege-user" element={<MessegeUser />} />
        <Route path="/messege-group" element={<MessegeGroup />} />
      </Routes>
    </div>
  );
};

export default App;
