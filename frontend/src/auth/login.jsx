import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login, error } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    login(identifier, password, redirectPath);
  };

  return (
    <div className="w-full flex flex-col h-screen justify-center items-center m-auto">
      <div className="p-14 w-full md:w-auto md:min-w-[400px] mb-10 border bg-gray-200">
        <h1 className="mb-4 text-2xl">Login</h1>
        <form className="w-full pb-5" onSubmit={handleLogin}>
          <div className="mb-4 w-full">
            <input
              type="email"
              placeholder="Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border-b-2 border-primary p-3 focus:outline-none"
            />
          </div>
          <div className="mb-6 items-end flex flex-col">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-primary p-3 focus:outline-none"
            />
          </div>
          <button
            className="w-full py-3 mb-4 text-lg font-semibold bg-primary text-black hover:bg-opacity-85"
            type="submit"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="m-auto text-center flex text-lg">
            <p>Have account already?</p>{" "}
            <Link className=" text-primary" to={"/auth/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
