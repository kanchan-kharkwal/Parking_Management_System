import React from "react";
import { Link } from "react-router-dom";
import car from "../assets/images/WhatsApp Image 2024-06-24 at 22.05.37_d0fc4e33.jpg";
import wilcher from "../assets/images/wheel.png";
import car1 from "../assets/images/image copy.png";
import car2 from "../assets/images/car1.png";
import car3 from "../assets/images/image copy.png";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-orange-500  text-white flex flex-col justify-between items-center">
        <div className="text-5xl font-bold p-4">Space-Sync</div>
        <nav className="bg-gray-700 p-2 flex justify-between w-full">
          <Link to="/" className="mx-2 text-lg">
            Home
          </Link>
          <Link to="/about" className="mx-2 text-lg">
            About us
          </Link>
          <Link to="/auth/login" className="mx-2 text-lg">
            Login/Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-center p-6 bg-white shadow-md rounded-lg m-6">
        <div className="lg:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to Space-Sync</h1>
          <p className="text-lg mb-4">
            Welcome to Space Sync, your ultimate destination for seamless
            parking management. With both user and admin panels, Space Sync
            revolutionizes the way parking lots operate, making parking easier
            and more convenient for everyone.
          </p>
          <p className="text-lg mb-4">
            Gone are the days of circling endlessly in search of a vacant spot.
            With Space Sync, users can effortlessly locate available parking
            spaces in real-time, saving time and frustration. Our user-friendly
            interface allows users to reserve parking spots in advance, ensuring
            a stress-free experience upon arrival.
          </p>
          <p className="text-lg mb-4">
            For parking lot owners and managers, Space Sync offers powerful
            administrative tools to streamline operations and maximize
            efficiency. From monitoring occupancy levels to managing
            reservations, our admin panel puts you in control, allowing you to
            optimize your parking facility for peak performance.
          </p>
          <p className="text-lg mb-4">
            Whether you're a driver in need of parking or a parking lot owner
            looking to enhance your management capabilities, Space Sync is your
            go-to solution for all things parking. Join us in reimagining the
            parking experience today!
          </p>
        </div>
        <div className="lg:w-1/2 p-4 flex flex-col items-center ">
          <img src={car} alt="Car" className="w-3/4 mb-4" />
          <div className="grid grid-cols-4 bg-gray-500 items-center gap-2 w-full">
            <img src={wilcher} alt="Wilcher" className="w-full" />
            <img src={car1} alt="Car1" className="w-full" />
            <img src={car2} alt="Car2" className="w-[80%]" />
            <img src={wilcher} alt="Wilcher" className="w-full" />
            <img src={car1} alt="Car1" className="w-[80%]" />{" "}
            <img src={car2} alt="Car2" className="w-[80%]" />{" "}
            <img src={car2} alt="Car2" className="w-[80%]" />
          </div>
          <Link
            to="/auth/login"
            className="bg-orange-500 text-white px-4 py-2 rounded mt-4"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}
