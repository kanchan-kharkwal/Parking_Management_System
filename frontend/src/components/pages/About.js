// src/components/pages/About.js
import React from 'react';
import carImage from '../../assets/car.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-left">
        <img src={carImage} alt="Car" className="about-image" />
      </div>
      <div className="about-right">
        <h1 className="about-heading">About Us</h1>
        <div className="about-section">
          <h2 className="about-subheading">Our Mission</h2>
          <p className="about-text">
            Welcome to Space Sync, the ultimate solution for seamless parking management. At Space Sync, we understand the frustrations that come with parking in crowded areas. That's why we've developed an innovative platform to revolutionize the parking experience for both drivers and parking lot owners.
          </p>
        </div>
        <div className="about-section">
          <h2 className="about-subheading">How It Works</h2>
          <p className="about-text">
            Our mission at Space Sync is to simplify parking for everyone involved. Whether you're a driver searching for an available spot or a parking lot owner looking to optimize your space, Space Sync has you covered.
          </p>
          <p className="about-text">
            Space Sync provides a comprehensive solution for parking management. Our user-friendly interface allows drivers to effortlessly locate available parking spaces in real-time, saving time and frustration. With advanced features such as reservation capabilities, drivers can secure their parking spot in advance, ensuring a stress-free experience upon arrival.
          </p>
          <p className="about-text">
            For parking lot owners and managers, Space Sync offers powerful administrative tools to streamline operations and maximize efficiency. From monitoring occupancy levels to managing reservations, our admin panel puts you in control, allowing you to optimize your parking facility for peak performance.
          </p>
        </div>
        <div className="about-section">
          <h2 className="about-subheading">Join Us Today</h2>
          <p className="about-text">
            Join us in reimagining the parking experience. Whether you're a driver in need of parking or a parking lot owner looking to enhance your management capabilities, Space Sync is your go-to solution for all things parking. Experience the future of parking management with Space Sync today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
