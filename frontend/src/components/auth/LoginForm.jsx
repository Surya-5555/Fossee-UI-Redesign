import React, { useEffect, useState } from 'react';

const LoginForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [registerUrl, setRegisterUrl] = useState('/workshop/register/');
  const [resetUrl, setResetUrl] = useState('/password_reset/');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const csrfEl = document.getElementById('django-csrf');
    const usernameEl = document.getElementById('django-username');
    const passwordEl = document.getElementById('django-password');
    const urlsEl = document.getElementById('django-urls');
    const errorsContainer = document.getElementById('django-errors');

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

    if (errorsContainer) {
      const errorEls = errorsContainer.querySelectorAll('.error-msg');
      const errorMsgs = Array.from(errorEls).map(el => el.textContent);
      setErrors(errorMsgs);
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh-56px)] w-full bg-white font-sans text-gray-900 overflow-hidden">
      {/* Left Pane - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center overflow-y-auto px-6 py-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-teal-900 rounded flex items-center justify-center text-white font-bold text-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <span className="font-bold text-xl text-gray-800 tracking-tight">FOSSEE Workshops</span>
          </div>

          <header className="mb-6 text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back!</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sign in to access your dashboard and continue managing your technical workshops.
            </p>
          </header>

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                <span className="text-sm font-bold text-red-800 uppercase tracking-wide">Error</span>
              </div>
              <ul className="m-0 pl-1 list-none">
                {errors.map((err, i) => (
                  <li key={i} className="text-xs text-red-700 font-medium leading-relaxed">{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form className="flex flex-col gap-5 w-full" method="POST" action="">
            <div dangerouslySetInnerHTML={{ __html: csrfToken }} />

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-semibold text-gray-700 text-left" htmlFor="id_username">Email / Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-700/60 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <div
                  className="w-full [&>input]:w-full [&>input]:box-border [&>input]:py-2.5 [&>input]:pl-11 [&>input]:pr-4 [&>input]:text-sm [&>input]:border [&>input]:border-gray-200 [&>input]:rounded-lg [&>input]:bg-white [&>input]:text-gray-900 [&>input]:focus:outline-none [&>input]:focus:border-teal-700 [&>input]:focus:ring-1 [&>input]:focus:ring-teal-700 [&>input]:transition-all"
                  dangerouslySetInnerHTML={{ __html: usernameInput }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 text-left" htmlFor="id_password">Password</label>
                <a href={resetUrl} className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors no-underline tracking-wide">Forgot Password?</a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-700/60 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </span>
                <div
                  className="w-full [&>input]:w-full [&>input]:box-border [&>input]:py-2.5 [&>input]:pl-11 [&>input]:pr-4 [&>input]:text-sm [&>input]:border [&>input]:border-gray-200 [&>input]:rounded-lg [&>input]:bg-white [&>input]:text-gray-900 [&>input]:focus:outline-none [&>input]:focus:border-teal-700 [&>input]:focus:ring-1 [&>input]:focus:ring-teal-700 [&>input]:transition-all"
                  dangerouslySetInnerHTML={{ __html: passwordInput }}
                />
              </div>
            </div>

            <button type="submit" className="mt-2 w-full h-[46px] px-6 text-sm font-bold text-white bg-[#0f3d3a] border-none rounded-lg cursor-pointer transition-colors hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-[#0f3d3a] focus:ring-offset-2 tracking-wide">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-gray-600">
            Don't have an Account? <a href={registerUrl} className="text-teal-700 hover:text-teal-900 font-bold transition-colors no-underline">Sign Up</a>
          </div>
        </div>
      </div>

      {/* Right Pane - Marketing/Info Banner */}
      <div className="hidden lg:flex w-1/2 bg-[#0f3d3a] p-10 xl:p-16 flex-col justify-center relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-teal-600/30 to-transparent opacity-80 pointer-events-none"></div>
        
        <div className="relative z-10 flex-col max-w-xl mx-auto w-full pb-10">
          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-10 tracking-tight">
            Revolutionize Workshops<br />with Smarter Automation
          </h2>
          
          <div className="relative mt-8">
            <svg className="absolute -left-6 -top-4 w-10 h-10 text-teal-400 opacity-60" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
            <p className="text-lg xl:text-xl text-teal-50 leading-snug indent-6">
              "FOSSEE Workshops has completely transformed our educational outreach process. It's reliable, efficient, and ensures our academic coordination is always top-notch."
            </p>
            <div className="flex items-center gap-4 mt-6 ml-6">
              <img src="https://ui-avatars.com/api/?name=Michael+Carter&background=2dd4bf&color=fff&rounded=true&bold=true" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-teal-500/50 shadow-sm" />
              <div>
                <div className="font-bold text-white text-sm">Michael Ramesh</div>
                <div className="text-teal-200 text-xs mt-0.5">Institute Coordinator at DevCore</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full mt-10 max-w-xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-bold tracking-widest text-teal-300/80 uppercase whitespace-nowrap">JOIN 1K INSTITUTES</h3>
            <div className="h-[1px] w-full bg-teal-600/50"></div>
          </div>
          
          <div className="flex justify-between items-center opacity-70 drop-shadow-sm flex-wrap gap-4">
            <span className="text-white font-bold text-sm xl:text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              IIT Bombay
            </span>
            <span className="text-white font-bold text-sm xl:text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              NIT Surathkal
            </span>
            <span className="text-white font-bold text-sm xl:text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              VJTI Mumbai
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
