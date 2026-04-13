import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/workshop/login/" replace />} />
        <Route path="/workshop/login/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
