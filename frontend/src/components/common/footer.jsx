import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">ABOUT US</h2>
            <p className="text-sm">
              "Welcome to 9jaTrip, your ultimate solution for hassle-free interstate and city transportation services! Whether you're planning a business trip, a weekend getaway, or visiting family and friends, we've got you covered.
            </p>
            <p className="text-sm mt-2">
              With our fleet of comfortable and reliable vehicles, experienced drivers, and convenient booking options, traveling across states and cities has never been easier. Sit back, relax, and enjoy the journey as we take you to your destination safely and on time. Book your next trip with 9jaTrip and experience travel the way it should be!"
            </p>
          </div>
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">OUR LOCATION</h2>
            <ul className="text-sm">
              <li>ILORIN - PIPELINE ROAD - 08035748544</li>
              <li>ABUJA - MARABA ROAD - 08035748544</li>
              <li>LAGOS - AJA ROAD - 08035748544</li>
              <li>PORT HARCOURT - Mile 1 - 08035748544</li>
              <li>IBADAN - CHALLENGE - 08035748544</li>
            </ul>
          </div>
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">COMMUNITY</h2>
            <ul className="text-sm">
              <li>Affiliates</li>
              <li>Partnership</li>
              <li>Invite a Friend</li>
              <li>Become a Driver</li>
              <li>Become a Locator Agent</li>
              <li>Event</li>
            </ul>
          </div>
          <div className="md:w-1/4">
            <h2 className="text-lg font-semibold mb-2">NEWS LETTER</h2>
            <p className="text-sm mb-4">
              Subscribe to our newsletter to receive news & updates. We promise not spamming you, super promise!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your Email"
                className="flex-grow p-2 border border-gray-300"
              />
              <button className="bg-green-500 text-white px-4 py-2">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
