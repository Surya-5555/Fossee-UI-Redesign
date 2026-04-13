import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

const RegisterForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [registerFormContent, setRegisterFormContent] = useState('');
  const [loginUrl, setLoginUrl] = useState('/workshop/login/');
  const [errors, setErrors] = useState([]);

  /**
   * Django-to-React Synchronization: Parses standard Django table-form HTML into React state.
   * This allows the backend to define the form schema (First Name, Institute, etc.) 
   * while React controls the visual presentation.
   */
  useEffect(() => {
    const csrfEl = document.getElementById('django-csrf');
    const formEl = document.getElementById('django-register-form');
    const urlsEl = document.getElementById('django-urls');
    const errorsContainer = document.getElementById('django-errors');

    const mockCsrf = '<input type="hidden" name="csrfmiddlewaretoken" value="dev_token" />';
    const mockForm = `
      <tr><th><label for="id_username">Username:</label></th><td><input type="text" name="username" required id="id_username" placeholder="Choose a username"></td></tr>
      <tr><th><label for="id_email">Email:</label></th><td><input type="email" name="email" required id="id_email" placeholder="Enter your email"></td></tr>
      <tr><th><label for="id_password">Password:</label></th><td><input type="password" name="password" required id="id_password" placeholder="Create a password"></td></tr>
    `;

    setCsrfToken(csrfEl ? csrfEl.innerHTML : mockCsrf);
    setRegisterFormContent(formEl ? formEl.innerHTML : mockForm);
    
    if (urlsEl) {
      setLoginUrl(urlsEl.getAttribute('data-login') || '/workshop/login/');
    }

    if (errorsContainer) {
      const errorEls = errorsContainer.querySelectorAll('.error-msg');
      const errorMsgs = Array.from(errorEls).map(el => el.textContent);
      setErrors(errorMsgs);
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh-56px)] w-full bg-white font-sans text-gray-900 overflow-hidden">
      {/* 
          Form Pane Config: Using `justify-start` with top-padding to ensure long forms (registration) 
          are scrollable from the absolute top. `justify-center` would cause top-clipping on overflow.
      */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex flex-col justify-start overflow-y-auto px-6 py-12 lg:px-16 xl:px-24"
      >
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-teal-900 rounded flex items-center justify-center text-white font-bold text-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            </div>
            <span className="font-bold text-xl text-gray-800 tracking-tight">FOSSEE Workshops</span>
          </div>

          <header className="mb-6 text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Join as Coordinator</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create your account to start proposing and managing technical workshops at your institute.
            </p>
          </header>

          {errors.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md overflow-hidden"
            >
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                <span className="text-sm font-bold text-red-800 uppercase tracking-wide">Registration Info</span>
              </div>
              <ul className="m-0 pl-1 list-none">
                {errors.map((err, i) => (
                  <li key={i} className="text-xs text-red-700 font-medium leading-relaxed">{err}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <form className="flex flex-col gap-5 w-full" method="POST" action="">
            <div dangerouslySetInnerHTML={{ __html: csrfToken }} />

            <div className="w-full overflow-hidden">
              <table
                className="w-full text-left 
                  [&_th]:block [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-gray-500 [&_th]:mb-1
                  [&_td]:block [&_td]:mb-4
                  [&_input]:w-full [&_input]:box-border [&_input]:py-2.5 [&_input]:px-4 [&_input]:text-sm [&_input]:border [&_input]:border-gray-200 [&_input]:rounded-lg [&_input]:bg-white [&_input]:text-gray-900 [&_input]:focus:outline-none [&_input]:focus:border-teal-700 [&_input]:focus:ring-1 [&_input]:focus:ring-teal-700 [&_input]:transition-all
                  [&_select]:w-full [&_select]:box-border [&_select]:py-2.5 [&_select]:px-4 [&_select]:text-sm [&_select]:border [&_select]:border-gray-200 [&_select]:rounded-lg [&_select]:bg-white [&_select]:focus:outline-none [&_select]:focus:border-teal-700 [&_.errorlist]:hidden"
                dangerouslySetInnerHTML={{ __html: registerFormContent }}
              />
            </div>

            <button type="submit" className="mt-2 w-full h-[46px] px-6 text-sm font-bold text-white bg-[#0f3d3a] border-none rounded-lg cursor-pointer transition-colors hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-[#0f3d3a] focus:ring-offset-2 tracking-wide">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-gray-600">
            Already have an Account? <a href={loginUrl} className="text-teal-700 hover:text-teal-900 font-bold transition-colors no-underline">Sign In</a>
          </div>
        </div>
      </motion.div>

      {/* Right Pane - Marketing/Info Banner */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="hidden lg:flex w-1/2 bg-[#0f3d3a] p-10 xl:p-16 flex-col justify-center relative overflow-y-auto"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-teal-600/30 to-transparent opacity-80 pointer-events-none"></div>
        
        <div className="relative z-10 flex-col max-w-xl mx-auto w-full pb-10">
          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-10 tracking-tight">
            Empower Your Institute<br />Through Workshops
          </h2>
          
          <div className="relative mt-8">
            <svg className="absolute -left-6 -top-4 w-10 h-10 text-teal-400 opacity-60" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
            <p className="text-lg xl:text-xl text-teal-50 leading-snug indent-6">
              "Joining the FOSSEE network allowed us to standardize our technical training. The platform makes coordination between instructors and institutes seamless."
            </p>
            <div className="flex items-center gap-4 mt-6 ml-6">
              <img src="https://ui-avatars.com/api/?name=Surya+S&background=2dd4bf&color=fff&rounded=true&bold=true" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-teal-500/50 shadow-sm" />
              <div>
                <div className="font-bold text-white text-sm">Surya S.</div>
                <div className="text-teal-200 text-xs mt-0.5">Senior Coordinator at IIT Bombay</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full mt-10 max-w-xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-bold tracking-widest text-teal-300/80 uppercase whitespace-nowrap">ACCREDITED NETWORK</h3>
            <div className="h-[1px] w-full bg-teal-600/50"></div>
          </div>
          
          <div className="flex justify-between items-center opacity-70 drop-shadow-sm flex-wrap gap-4">
            <span className="text-white font-bold text-sm xl:text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Verified Institutes
            </span>
            <span className="text-white font-bold text-sm xl:text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Quick Approval
            </span>
            <span className="text-white font-bold text-sm xl:text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Direct Management
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
