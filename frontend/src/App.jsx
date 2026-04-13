import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import PasswordResetForm from './components/auth/PasswordResetForm';
import PasswordResetDone from './components/auth/PasswordResetDone';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/workshop/login/" replace />} />
        <Route path="/workshop/login/" element={<LoginForm />} />
        <Route path="/workshop/register/" element={<RegisterForm />} />
        <Route path="/reset/password_reset/" element={<PasswordResetForm />} />
        <Route path="/reset/password_reset/done/" element={<PasswordResetDone />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
