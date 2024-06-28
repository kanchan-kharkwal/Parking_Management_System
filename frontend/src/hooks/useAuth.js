import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess, logout } from "../redux/actions";
import { API_URL } from "../constants/url";
import { useEffect } from "react";
import axios from "axios";

const TOKEN_KEY = "_auth_token";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const redirect = searchParams.get("redirect");
    if (token) {
      dispatch(loginSuccess(token, {}));
      axios
        .get(`${API_URL}/api/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          dispatch(loginSuccess(token, res.data));
          // navigate(redirect || "/");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem(TOKEN_KEY);
        });
    }
  }, [dispatch]);

  const login = async (email, password, redirectPath) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data.token, data.user));
        localStorage.setItem(TOKEN_KEY, data.token); // Store token in localStorage
        navigate(redirectPath || "/");
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred"));
    }
  };

  const register = async (email, password,  name,redirectPath) => {
 
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,name,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess(data.token, data.user));
        localStorage.setItem(TOKEN_KEY, data.token); // Store token in localStorage
        navigate(redirectPath || "/");
      } else {
        dispatch(loginFailure(data.error.message || "Registration failed"));
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred during registration"));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem(TOKEN_KEY);
  };

  const isLoggedIn = () => {
    setTimeout(() => {}, 500);
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  };

  return {
    isAuthenticated,
    user,
    error,
    login,
    register,
    logout: logoutUser,
    isLoggedIn,
  };
};

export default useAuth;
