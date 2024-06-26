import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    setTimeout(() => {
      checkAuth();
    }, 500);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login?redirect=${location.pathname}`} />;
  }

  return children;
};

export default ProtectedRoute;
