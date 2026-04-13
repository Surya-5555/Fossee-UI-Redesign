import React, { useEffect, useState } from 'react';

const LoginForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [registerUrl, setRegisterUrl] = useState('/workshop/register/');
  const [resetUrl, setResetUrl] = useState('/password_reset/');

  useEffect(() => {
    const csrfEl = document.getElementById('django-csrf');
    const usernameEl = document.getElementById('django-username');
    const passwordEl = document.getElementById('django-password');
    const urlsEl = document.getElementById('django-urls');

    // Fallbacks to render standard inputs on Vite localhost
    const mockCsrf = '<input type="hidden" name="csrfmiddlewaretoken" value="dev_token" />';
    const mockUsername = '<input type="text" name="username" autofocus autocapitalize="none" autocomplete="username" maxlength="150" required id="id_username" placeholder="Enter your username" />';
    const mockPassword = '<input type="password" name="password" autocomplete="current-password" required id="id_password" placeholder="Enter your password" />';

    setCsrfToken(csrfEl ? csrfEl.innerHTML : mockCsrf);
    setUsernameInput(usernameEl ? usernameEl.innerHTML : mockUsername);
    setPasswordInput(passwordEl ? passwordEl.innerHTML : mockPassword);
    
    if (urlsEl) {
      setRegisterUrl(urlsEl.getAttribute('data-register') || '/workshop/register/');
      setResetUrl(urlsEl.getAttribute('data-reset') || '/password_reset/');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-900 w-full">
      <main className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 m-0">Sign In</h1>
          <p className="text-sm text-gray-500 mt-2">Access the FOSSEE Workshop Portal</p>
        </header>

        <form className="flex flex-col gap-5 w-full" method="POST" action="">
          <div dangerouslySetInnerHTML={{ __html: csrfToken }} />

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-gray-700 text-left" htmlFor="id_username">Username</label>
            <div
              className="w-full [&>input]:w-full [&>input]:box-border [&>input]:p-3 [&>input]:text-sm [&>input]:border [&>input]:border-gray-300 [&>input]:rounded-md [&>input]:bg-gray-50 [&>input]:text-gray-900 [&>input]:focus:outline-none [&>input]:focus:border-blue-600 [&>input]:focus:ring-1 [&>input]:focus:ring-blue-600 [&>input]:focus:bg-white [&>input]:transition-all"
              dangerouslySetInnerHTML={{ __html: usernameInput }}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-gray-700 text-left" htmlFor="id_password">Password</label>
            <div
              className="w-full [&>input]:w-full [&>input]:box-border [&>input]:p-3 [&>input]:text-sm [&>input]:border [&>input]:border-gray-300 [&>input]:rounded-md [&>input]:bg-gray-50 [&>input]:text-gray-900 [&>input]:focus:outline-none [&>input]:focus:border-blue-600 [&>input]:focus:ring-1 [&>input]:focus:ring-blue-600 [&>input]:focus:bg-white [&>input]:transition-all"
              dangerouslySetInnerHTML={{ __html: passwordInput }}
            />
          </div>

          <button type="submit" className="mt-4 w-full h-[48px] px-6 text-sm font-semibold text-white bg-blue-600 border-none rounded-md cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Sign In
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm">
          <a href={registerUrl} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">New around here? Sign up</a>
          <a href={resetUrl} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Forgot password?</a>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;
