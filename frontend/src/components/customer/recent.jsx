import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { useSelector } from "react-redux";
import Modal from "../../ui/modal";

const TOKEN_KEY = "_auth_token";

const Recent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem(TOKEN_KEY);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/bookings/my`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userBookings = response.data.filter(
          (booking) => booking.user === user._id
        );

        setBookings(userBookings);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching bookings", error);
      }
    };

    fetchBookings();
  }, [token, user]);

  const handleCheckOut = async (bookingId, slotId) => {
    try {
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}`,
        { status: "end" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.put(
        `${API_URL}/api/slots/${slotId}`,
        { isAvailable: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "end" } : b))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const getStatus = (booking) => {
    const now = new Date();
    if (booking.status === "end") return "Ended";
    if (new Date(booking.endTime) < now) return "Overdue";
    return "Ongoing";
  };

  const sortedBookings = bookings.sort((a, b) => {
    const statusOrder = ["Ongoing", "Overdue", "Ended"];
    const statusA = getStatus(a);
    const statusB = getStatus(b);
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  });

  return (
    <div className="w-full mb-4">
      <h2 className="text-2xl font-bold mb-2">My Booking History</h2>
      {loading ? (
        <div>Loading...</div>
      ) : sortedBookings.length === 0 ? (
        <div>No booking history.</div>
      ) : (
        <ul className="space-y-2">
          {sortedBookings.map((booking) => (
            <li key={booking._id} className="p-4 border rounded bg-gray-100">
              <div>Slot Number: {booking.slot?.slotNumber}</div>
              <div>Area: {booking.slot?.area.name}</div>
              <div>
                Start Time: {new Date(booking.startTime).toLocaleString()}
              </div>
              <div>End Time: {new Date(booking.endTime).toLocaleString()}</div>
              <div className="flex items-center">
                Status:
                <div
                  className={`${
                    getStatus(booking) === "Ongoing"
                      ? "bg-yellow-500"
                      : getStatus(booking) === "Overdue"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  } w-max py-0 p-1 ml-2`}
                >
                  {getStatus(booking)}
                </div>
              </div>
              {getStatus(booking) !== "Ended" && (
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsModalOpen(true);
                  }}
                >
                  Check-Out
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && selectedBooking && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="p-4 bg-white">
            <h3 className="text-xl mb-4">Check-Out Confirmation</h3>
            <p>
              Do you want to check-out from slot{" "}
              {selectedBooking.slot.slotNumber}?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={handleModalClose}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() =>
                  handleCheckOut(selectedBooking._id, selectedBooking.slot._id)
                }
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Recent;
