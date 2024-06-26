import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { FiCheck } from "react-icons/fi";
import MySlot from "../components/customer/my-slot";
import Modal from "../ui/modal";
import BookingModal from "../components/customer/bookingForm";
import { useSelector } from "react-redux";
import car from "../assets/images/image.png";

const TOKEN_KEY = "_auth_token";

const ViewSlots = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem(TOKEN_KEY);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/areas`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const areasData = response.data;

        // Fetch slots for each area
        const areasWithSlots = await Promise.all(
          areasData.map(async (area) => {
            const slotsResponse = await axios.get(
              `${API_URL}/api/areas/${area._id}/slots`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            );
            return { ...area, slots: slotsResponse.data };
          })
        );

        setAreas(areasWithSlots);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching areas", error);
      }
    };

    fetchAreas();
  }, [token]);

  const handleSlotClick = (slot) => {
    if (!slot.isAvailable) {
      alert("This slot is not available.");
      return;
    }
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleBooking = async (bookingDetails) => {
    try {
      // Create booking
      const response = await axios.post(
        `${API_URL}/api/bookings`,
        {
          user: user?._id,
          slot: selectedSlot._id,
          ...bookingDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update slot availability
      await axios.put(
        `${API_URL}/api/slots/${selectedSlot._id}`,
        { isAvailable: false },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update slot availability in the state
      setAreas((prevAreas) =>
        prevAreas.map((area) =>
          area._id === selectedSlot.area
            ? {
                ...area,
                slots: area.slots.map((slot) =>
                  slot._id === selectedSlot._id
                    ? { ...slot, isAvailable: false }
                    : slot
                ),
              }
            : area
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  // Function to generate random background colors
  const getRandomBgColor = () => {
    const colors = [
      "bg-red-200",
      "bg-gray-500",
      "bg-gray-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-blue-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-orange-200",
      "bg-teal-200",
      "bg-indigo-200",
      "bg-lime-200",
      "bg-amber-200",
      "bg-rose-200",
      "bg-cyan-200",
      "bg-violet-200",
      "bg-fuchsia-200",
      "bg-emerald-200",
      "bg-sky-300",
      "bg-stone-200",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="p-4 w-full flex flex-col items-end">
      <div className="flex w-full flex-col gap-2">
        {loading ? (
          <div>Loading...</div>
        ) : (
          areas.map((area) => (
            <div
              key={area._id}
              className="relative p-4 m-0 w-[98.6vw] sm:w-auto  border rounded bg-gray-100"
            >
              <h3 className="mb-2 text-xl font-bold">Area {area.name}</h3>

              <div className="grid md:grid-cols-6 grid-cols-4 lg:grid-cols-10 gap-2">
                {area.slots.map((slot) => (
                  <div
                    key={slot._id}
                    className={`relative cursor-pointer w-20 h-32 flex items-center justify-center ${getRandomBgColor()} bg-opacity-50 text-center rounded`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.slotNumber}
                    {!slot.isAvailable && (
                      <div className="absolute inset-0  text-white font-bold  ">
                        <img className="w-full h-full" src={car} />
                        <div className="bg-red-500 bg-opacity-45 flex items-center justify-center  inset-0 absolute z-10 top-0">
                          <FiCheck /> Taken
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <BookingModal
            slot={selectedSlot}
            onClose={handleModalClose}
            onBooking={handleBooking}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewSlots;
