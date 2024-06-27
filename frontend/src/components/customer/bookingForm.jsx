import React, { useState } from "react";

const BookingModal = ({ slot, onClose, onBooking }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBooking({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      vehicleNo: vehicleNo,
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Book Slot {slot.slotNumber}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">vehicle No:</label>
          <input
            type="text"
            placeholder="enter vehicle no"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingModal;
