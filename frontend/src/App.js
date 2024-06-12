// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import JoinUs from './components/pages/JoinUs';
import Auth from './components/pages/Auth';
import AdminLogin from './components/admin/AdminLogin';
import AdminSignUp from './components/admin/AdminSignUp';
import UserLogin from './components/user/UserLogin';
import UserSignUp from './components/user/UserSignUp';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';

import './App.css';
import FAQ from './components/pages/FAQ';


function App() {
  return (
    <Router>
        <Header />
        <Navbar />
        <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/admin-auth" element={<Auth />} />
          <Route path="/user-auth" element={<Auth />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default App;