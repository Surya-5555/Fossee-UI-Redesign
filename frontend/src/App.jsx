import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import PasswordResetForm from './components/auth/PasswordResetForm';
import PasswordResetDone from './components/auth/PasswordResetDone';
import PasswordResetConfirmForm from './components/auth/PasswordResetConfirmForm';
import PasswordResetComplete from './components/auth/PasswordResetComplete';
import WorkshopPublicStats from './components/statistics/WorkshopPublicStats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/workshop/login/" replace />} />
        <Route path="/workshop/login/" element={<LoginForm />} />
        <Route path="/workshop/register/" element={<RegisterForm />} />
        <Route path="/reset/password_reset/" element={<PasswordResetForm />} />
        <Route path="/reset/password_reset/done/" element={<PasswordResetDone />} />
        <Route path="/reset/:uidb64/:token/" element={<PasswordResetConfirmForm />} />
        <Route path="/reset/done/" element={<PasswordResetComplete />} />
        <Route path="/statistics/public/" element={<WorkshopPublicStats />} />
        <Route path="/statistics/public" element={<WorkshopPublicStats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
