// src/components/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import carImage1 from '../../assets/car.png';
import carImage2 from '../../assets/car.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-left-content">
          <h1 className="home-heading">Welcome to Space-Sync</h1>
          <p className="home-paragraph">
            Welcome to Space Sync, your ultimate destination for seamless parking management. With both user and admin panels, Space Sync revolutionizes the way parking lots operate, making parking easier and more convenient for everyone. Gone are the days of circling endlessly in search of a vacant spot. With Space Sync, users can effortlessly locate available parking spaces in real-time, saving time and frustration. Our user-friendly interface allows users to reserve parking spots in advance, ensuring a stress-free experience upon arrival.
          </p>
        </div>
        <div className="home-right-content">
          <img src={carImage1} alt="Car" className="home-image" />
        </div>
      </div>
      <div className="home-content">
        <div className="home-left-content">
          <img src={carImage2} alt="Car" className="home-image" />
        </div>
        <div className="home-right-content">
          <p className="home-paragraph">
            For parking lot owners and managers, Space Sync offers powerful administrative tools to streamline operations and maximize efficiency. From monitoring occupancy levels to managing reservations, our admin panel puts you in control, allowing you to optimize your parking facility for peak performance. Whether you're a driver in need of parking or a parking lot owner looking to enhance your management capabilities, Space Sync is your go-to solution for all things parking. 
          </p>
        </div>
      </div>

      <div className="home-button-container">
        <div>
          <p>Join us in reimagining the parking experience today!</p>
        </div>
        <div>
          <Link to="/dashboard" className="home-button">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
