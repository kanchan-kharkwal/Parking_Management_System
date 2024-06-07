// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/JoinUs';
import Auth from './components/pages/Auth';
import AdminLogin from './components/admin/AdminLogin';
import AdminSignUp from './components/admin/AdminSignUp';
import UserLogin from './components/user/UserLogin';
import UserSignUp from './components/user/UserSignUp';
import UserDashboard from './components/user/UserDashboard';
import './App.css';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-auth" element={<Auth />} />
          <Route path="/user-auth" element={<Auth />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default App;
