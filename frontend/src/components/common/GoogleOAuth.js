// src/components/common/GoogleOAuth.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleOAuth = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId="710099309781-k19136cosb63dpbpvg77tokfmthcmts6.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Login with Google"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuth;
