import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://parking-management-system-hri4.onrender.com/api";

const AreaForm = ({ onClose, onAreaCreated }) => {
  const [name, setName] = useState("");
  const [numberOfSlots, setNumberOfSlots] = useState("");
  const [loading, setLoading] = useState(false);
  const TOKEN_KEY = "_auth_token";
  const token = localStorage.getItem(TOKEN_KEY);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/areas`,
        {
          name,
          numberOfSlots,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      onAreaCreated(response.data);
      onClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error creating area", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Parking Area</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Area Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="numberOfSlots"
        >
          Number of Slots
        </label>
        <input
          type="number"
          id="numberOfSlots"
          value={numberOfSlots}
          onChange={(e) => setNumberOfSlots(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Creating..." : "Create"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AreaForm;
