// src/components/common/GoogleOAuth.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleOAuth = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId="your-client-id.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Login with Google"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuth;
