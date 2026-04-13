import React, { useEffect, useState } from 'react';

const RegisterForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [registerFormContent, setRegisterFormContent] = useState('');

  useEffect(() => {
    const csrfEl = document.getElementById('django-csrf');
    const formEl = document.getElementById('django-register-form');

    const mockCsrf = '<input type="hidden" name="csrfmiddlewaretoken" value="dev_token" />';
    const mockForm = `
      <tr><th><label for="id_username">Username:</label></th><td><input type="text" name="username" required id="id_username"></td></tr>
      <tr><th><label for="id_email">Email:</label></th><td><input type="email" name="email" required id="id_email"></td></tr>
      <tr><th><label for="id_password">Password:</label></th><td><input type="password" name="password" required id="id_password"></td></tr>
    `;

    setCsrfToken(csrfEl ? csrfEl.innerHTML : mockCsrf);
    setRegisterFormContent(formEl ? formEl.innerHTML : mockForm);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-900 w-full">
      <main className="w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 m-0">Coordinator Registration</h1>
          <p className="text-sm text-gray-500 mt-2">Create an account for the FOSSEE Workshop Portal</p>
        </header>

        <form className="flex flex-col gap-6 w-full" method="POST" action="">
          <div dangerouslySetInnerHTML={{ __html: csrfToken }} />

          <table
            className="w-full text-left [&_th]:pb-4 [&_th]:pr-6 [&_th]:font-semibold [&_th]:text-gray-700 [&_th]:align-top [&_th]:w-1/3 [&_td]:pb-4 [&_input]:w-full [&_input]:box-border [&_input]:p-3 [&_input]:text-sm [&_input]:border [&_input]:border-gray-300 [&_input]:rounded-md [&_input]:bg-gray-50 [&_input]:text-gray-900 [&_input]:focus:outline-none [&_input]:focus:border-blue-600 [&_input]:focus:ring-1 [&_input]:focus:ring-blue-600 [&_input]:focus:bg-white [&_input]:transition-all [&_select]:w-full [&_select]:box-border [&_select]:p-3 [&_select]:text-sm [&_select]:border [&_select]:border-gray-300 [&_select]:rounded-md [&_select]:bg-gray-50 [&_select]:focus:outline-none [&_select]:focus:border-blue-600 [&_.errorlist]:text-red-500 [&_.errorlist]:text-xs [&_.errorlist]:mt-1 [&_.errorlist]:list-none [&_.errorlist]:p-0"
            dangerouslySetInnerHTML={{ __html: registerFormContent }}
          />

          <button type="submit" className="mt-4 w-full h-[48px] px-6 text-sm font-semibold text-white bg-blue-600 border-none rounded-md cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a href="/workshop/login/" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Already have an account? Sign In</a>
        </div>
      </main>
    </div>
  );
};

export default RegisterForm;
