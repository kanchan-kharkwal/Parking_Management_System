// src/components/auth/AuthPage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import GoogleOAuth from '../common/GoogleOAuth';
import './Auth.css';

const Auth= () => {
  const [isLogin, setIsLogin] = useState(false);
  const [authType, setAuthType] = useState('user');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'user';
    setAuthType(type);
  }, [location]);

  const handleGoogleSuccess = (response) => {
    // Handle Google auth success
    console.log('Google auth success:', response);
  };

  const handleGoogleFailure = (response) => {
    // Handle Google auth failure
    console.log('Google auth failure:', response);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'} as {authType === 'user' ? 'User' : 'Admin'}</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <GoogleOAuth onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
