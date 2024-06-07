// src/components/user/UserSignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleOAuth from '../common/GoogleOAuth';
import './UserSignUp.css';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    // On success:
    navigate('/user-dashboard');
  };

  const handleGoogleSuccess = (response) => {
    // Handle Google sign-up success
    console.log('Google sign-up success:', response);
    navigate('/user-dashboard');
  };

  const handleGoogleFailure = (response) => {
    // Handle Google sign-up failure
    console.log('Google sign-up failure:', response);
  };

  return (
    <div className="user-signup-container">
      <form onSubmit={handleSignUp} className="user-signup-form">
        <h2>User SignUp</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <GoogleOAuth onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />
    </div>
  );
};

export default UserSignUp;
