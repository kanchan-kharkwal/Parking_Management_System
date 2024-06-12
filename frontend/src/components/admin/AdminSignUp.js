// src/components/admin/AdminSignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleOAuth from '../common/GoogleOAuth';
import './AdminSignUp.css';

const AdminSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    // On success:
    navigate('/admin-dashboard');
  };

  const handleGoogleSuccess = (response) => {
    // Handle Google sign-up success
    console.log('Google sign-up success:', response);
    navigate('/admin-dashboard');
  };

  const handleGoogleFailure = (response) => {
    // Handle Google sign-up failure
    console.log('Google sign-up failure:', response);
  };

  return (
    <div className="admin-signup-container">
      <form onSubmit={handleSignUp} className="admin-signup-form">
        <h2>Admin SignUp</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign Up</button>
        <GoogleOAuth onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />
      </form>
    </div>
  );
};

export default AdminSignUp;
