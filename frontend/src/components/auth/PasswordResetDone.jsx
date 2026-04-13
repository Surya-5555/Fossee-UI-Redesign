import React from 'react';

const PasswordResetDone = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans w-full">
      <main className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Request Received</h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          Instructions for setting a new password have been mailed to your registered email address. Please check your inbox.
        </p>
        <a href="/workshop/login/" className="flex items-center justify-center w-full h-[48px] px-6 text-sm font-semibold text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700 hover:text-white no-underline">
          Return to Login
        </a>
      </main>
    </div>
  );
};

export default PasswordResetDone;
