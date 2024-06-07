// src/components/admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleOAuth from '../common/GoogleOAuth';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    // On success:
    navigate('/admin-dashboard');
  };


  const handleGoogleSuccess = (response) => {
    // Handle Google login success
    console.log('Google login success:', response);
    navigate('/admin-dashboard');
  };

  const handleGoogleFailure = (response) => {
    // Handle Google login failure
    console.log('Google login failure:', response);
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>Admin Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <GoogleOAuth onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />
    </div>
  );
};

export default AdminLogin;
