import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/workshop/login/" replace />} />
        <Route path="/workshop/login/" element={<LoginForm />} />
        <Route path="/workshop/register/" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
