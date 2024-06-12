// src/components/common/Navbar.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About Us</Link>
      <Link to="/contact" className="nav-link">Contact Us</Link>
      <Link to="/FAQ" className="nav-link">FAQ</Link>
      <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Join-Us
      </button>
        {showDropdown && (
          <div className="dropdown-menu">
          <Link to="/user-login" className="dropdown-item">User Login</Link>
          <Link to="/user-signup" className="dropdown-item">User Sign Up</Link>
          <Link to="/admin-login" className="dropdown-item">Admin Login</Link>
          <Link to="/admin-signup" className="dropdown-item">Admin Sign Up</Link>
         </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
