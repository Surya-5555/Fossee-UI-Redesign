import React, { useEffect, useState } from 'react';

const PasswordResetComplete = () => {
  const [loginUrl, setLoginUrl] = useState('/workshop/login/');

  useEffect(() => {
    const urlsEl = document.getElementById('django-urls');
    if (urlsEl) {
      setLoginUrl(urlsEl.getAttribute('data-login') || '/workshop/login/');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans w-full">
      <main className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Password Reset</h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          Your password has been successfully reset. You can now use your new password to log in to your account.
        </p>
        <a href={loginUrl} className="flex items-center justify-center w-full h-[48px] px-6 text-sm font-semibold text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700 hover:text-white no-underline">
          Return to Login
        </a>
      </main>
    </div>
  );
};

export default PasswordResetComplete;
