import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Navigate } from "react-router-dom";
import Login from "./auth/login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/common/header";
import Sidebar from "./components/sidebar";
import Slots from "./pages/slots";
import Register from "./auth/register";
import Logout from "./auth/Logout";
import { useSelector } from "react-redux";
import ViewSlots from "./pages/viewSlots";
import Users from "./pages/users";
import useAuth from "./hooks/useAuth";
import CustomerHome from "./pages/customerHome";
import Landing from "./pages/landing";
import Recent from "./components/customer/recent";
import Customers from "./pages/customers";
import Overview from "./pages/overview";
import Settings from "./pages/settings";
import AboutUs from "./components/common/AboutUs";

function Pages() {
  const user = useSelector((state) => state.auth.user);
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

  if (
    !isAuthenticated &&
    location.pathname !== "/auth/login" &&
    location.pathname !== "/auth/register" &&
    location.pathname !== "/" &&
    location.pathname !== "/about"
  ) {
    return <Navigate to={`/auth/login?redirect=${location.pathname}`} />;
  }
  return (
    <Routes>
      {user !== null ? (
        user?.role === "admin" ? (
          <>
            <Route path="/" element={<Overview />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/slots" element={<Slots />} />
          </>
        ) : (
          <>
            <Route path="/" element={<CustomerHome />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/slots" element={<ViewSlots />} />
          </>
        )
      ) : (
        <>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/auth/login" element={<Login />} />
        </>
      )}
      <Route path="/" element={<Redirect />} />
      <Route path="/check-in" element={<ProtectedRoute></ProtectedRoute>} />
      <Route path="/*" element={<>Not found</>} />
      <Route path="/auth/logout" element={<Logout />} />
    </Routes>
  );
}

function Routing() {
  const location = useLocation();
  const noSidebarRoutes = ["/auth/login", "/auth/register"];

  const user = useSelector((state) => state.auth.user);
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  if (location.pathname === "/auth/login") {
    return (
      <div className="md:mx-16 ">
        <Login />
      </div>
    );
  }
  if (location.pathname === "/auth/register") {
    return (
      <div className="md:mx-16 ">
        <Register />
      </div>
    );
  }
  if (location.pathname === "/landing") {
    return (
      <div className="md:mx-16 ">
        <Landing />
      </div>
    );
  }
  if (location.pathname === "/about") {
    return (
      <div className="md:mx-16 ">
        <AboutUs />
      </div>
    );
  }
  return (
    <div>
      {shouldShowSidebar && <Header />}
      <div className="flex  mx-auto overflow-hidden p-0 m-0  bg-sky-50  w-full h-[100vh]">
        {shouldShowSidebar && user?.role === "admin" && (
          <div className="flex ">
            <div className="hidden  lg:block">
              <Sidebar />
            </div>
          </div>
        )}
        <div
          className={`lg:px-4 mt-14 flex justify-center items-start mx-auto w-[99vw] max-w-[99vw] ${
            shouldShowSidebar ? "lg:w-[79.6vw]" : "w-[99.6vw]"
          } p-2 overflow-auto lg:pb-4`}
        >
          <Pages />
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);

export default App;

function Redirect() {
  useEffect(() => {
    window.location.href = "/landing";
  }, []);
  return <></>;
}
