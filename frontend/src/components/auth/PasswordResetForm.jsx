import React, { useEffect, useState } from 'react';

const PasswordResetForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [resetFormContent, setResetFormContent] = useState('');
  const [cancelUrl, setCancelUrl] = useState('/');

  useEffect(() => {
    const csrfEl = document.getElementById('django-csrf');
    const formEl = document.getElementById('django-reset-form');
    const urlsEl = document.getElementById('django-urls');

    const mockCsrf = '<input type="hidden" name="csrfmiddlewaretoken" value="dev_token" />';
    const mockForm = '<label for="id_email">Email address:</label><input type="email" name="email" maxlength="254" required id="id_email">';
    
    setCsrfToken(csrfEl ? csrfEl.innerHTML : mockCsrf);
    setResetFormContent(formEl ? formEl.innerHTML : mockForm);
    
    if (urlsEl) {
      setCancelUrl(urlsEl.getAttribute('data-cancel') || '/');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-900 w-full">
      <main className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 m-0">Forgot Password?</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your registered email address to reset your password</p>
        </header>

        <form className="flex flex-col gap-5 w-full" method="POST" action="">
          <div dangerouslySetInnerHTML={{ __html: csrfToken }} />

          <div 
            className="flex flex-col gap-2 w-full text-sm font-semibold text-gray-700 text-left [&>input]:w-full [&>input]:font-normal [&>input]:mt-1 [&>input]:box-border [&>input]:p-3 [&>input]:text-sm [&>input]:border [&>input]:border-gray-300 [&>input]:rounded-md [&>input]:bg-gray-50 [&>input]:text-gray-900 [&>input]:focus:outline-none [&>input]:focus:border-blue-600 [&>input]:focus:ring-1 [&>input]:focus:ring-blue-600 [&>input]:focus:bg-white [&>input]:transition-all [&_.errorlist]:text-red-500 [&_.errorlist]:font-normal [&_.errorlist]:text-xs [&_.errorlist]:m-0 [&_.errorlist]:p-0 [&_.errorlist]:list-none"
            dangerouslySetInnerHTML={{ __html: resetFormContent }}
          />

          <div className="flex gap-3 w-full mt-4">
            <button type="submit" className="flex-1 h-[48px] px-6 text-sm font-semibold text-white bg-blue-600 border-none rounded-md cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              Request
            </button>
            <a href={cancelUrl} className="flex-1 flex items-center justify-center h-[48px] px-6 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md cursor-pointer transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 no-underline">
              Cancel
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PasswordResetForm;
