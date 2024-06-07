import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './JoinUs.css';

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="dashboard-container">
      <h1>Login / SignUp</h1>
      <div className="dropdown">

      <button onClick={toggleDropdown} className="dropdown-toggle">
          Select Authentication
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <Link to="/auth?type=user" className="dropdown-item">User Login/Sign Up</Link>
            <Link to="/auth?type=admin" className="dropdown-item">Admin Login/Sign Up</Link>
          </div>
        )}

      {/* <Link to="/user-auth">
          <button>User Login</button>
        </Link>
        <Link to="/admin-auth">
          <button>Admin Login</button>
        </Link> */}


        {/* <Link to="/admin-login">
          <button>Admin Login</button>
        </Link>
        <Link to="/admin-signup">
          <button>Admin SignUp</button>
        </Link>
        <Link to="/user-login">
          <button>User Login</button>
        </Link>
        <Link to="/user-signup">
          <button>User SignUp</button>
        </Link> */}
        
      </div>
    </div>
  );
};

export default Dashboard;
