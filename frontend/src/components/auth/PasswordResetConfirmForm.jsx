import React, { useEffect, useState } from 'react';

const PasswordResetConfirmForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [formContent, setFormContent] = useState('');
  const [isValidLink, setIsValidLink] = useState(true);

  useEffect(() => {
    const validLinkEl = document.getElementById('django-validlink');
    const csrfEl = document.getElementById('django-csrf');
    const formEl = document.getElementById('django-reset-confirm-form');

    setIsValidLink(validLinkEl ? validLinkEl.innerText.trim() === 'true' : true);
    
    const mockCsrf = '<input type="hidden" name="csrfmiddlewaretoken" value="dev_token" />';
    const mockForm = `
      <tr><th><label>New password</label></th><td><input type="password" name="new_password1" required></td></tr>
      <tr><th><label>New password confirmation</label></th><td><input type="password" name="new_password2" required></td></tr>
    `;
    
    setCsrfToken(csrfEl ? csrfEl.innerHTML : mockCsrf);
    setFormContent(formEl ? formEl.innerHTML : mockForm);
  }, []);

  if (!isValidLink) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-900 w-full">
        <main className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center border-t-4 border-t-red-600">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Link</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">This password reset link is invalid. It may have already been used, or it might have expired.</p>
          <a href="/reset/password_reset/" className="inline-block flex items-center justify-center w-full h-[48px] px-6 text-sm font-semibold text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700 no-underline">
            Request New Link
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-900 w-full">
      <main className="w-full max-w-lg bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 m-0">Set New Password</h1>
          <p className="text-sm text-gray-500 mt-2">Please enter your new password twice so we can verify you typed it in correctly.</p>
        </header>

        <form className="flex flex-col gap-6 w-full" method="POST" action="">
          <div dangerouslySetInnerHTML={{ __html: csrfToken }} />

          <table 
            className="w-full text-left [&_th]:pb-4 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-gray-700 [&_th]:align-top [&_th]:w-1/3 [&_td]:pb-6 [&_input]:w-full [&_input]:box-border [&_input]:p-3 [&_input]:text-sm [&_input]:border [&_input]:border-gray-300 [&_input]:rounded-md [&_input]:bg-gray-50 [&_input]:text-gray-900 [&_input]:focus:outline-none [&_input]:focus:border-blue-600 [&_input]:focus:ring-1 [&_input]:focus:ring-blue-600 [&_input]:transition-all [&_ul]:p-0 [&_ul]:mt-2 [&_li]:text-xs [&_li]:text-gray-500 [&_li]:list-none"
            dangerouslySetInnerHTML={{ __html: formContent }}
          />

          <button type="submit" className="w-full h-[48px] px-6 text-sm font-semibold text-white bg-blue-600 border-none rounded-md cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Change Password
          </button>
        </form>
      </main>
    </div>
  );
};

export default PasswordResetConfirmForm;
