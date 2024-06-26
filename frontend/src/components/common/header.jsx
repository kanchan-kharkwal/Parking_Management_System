import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FiClipboard, FiClock, FiHome, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

const Header = () => {
  const { logout } = useAuth();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white fixed top-0 right-0 flex items-center justify-between px-6 py-1 z-50">
      <div className="flex w-full items-center justify-end space-x-2 sm:space-x-4 p-2 relative">
        <div className="w-full flex gap-3">
          <Link className="flex items-center gap-1" to={"/"}>
            <FiHome />
            Home
          </Link>
          <Link className="flex items-center gap-1" to={"/slots"}>
            <FiClipboard />
            Slots
          </Link>
          {user?.role !== "admin" && (
            <Link className="flex items-center gap-1" to={"/recent"}>
              <FiClock /> Recent
            </Link>
          )}
        </div>
        <button
          onClick={toggleDropdown}
          className="flex items-center w-full space-x-2 focus:outline-none"
        >
          {isAuthenticated ? (
            <>
              <FiUser /> <span>{user?.name}</span>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/auth/login"}
                className="bg-primary hover:bg-opacity-80 p-2 py-1 text-white rounded-lg"
              >
                Login
              </Link>
              <Link
                to={"/auth/register"}
                className="bg-gray-400 hover:bg-opacity-80 p-2 py-1 text-white rounded-lg"
              >
                Register
              </Link>
            </div>
          )}
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50"
          >
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
