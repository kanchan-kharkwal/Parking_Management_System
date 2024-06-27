import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiBag } from "react-icons/tfi";
import { API_URL } from "../../constants/url";
const TOKEN_KEY = "_auth_token";

const Analysis = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [filledSlots, setFilledSlots] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch total users
        const usersResponse = await axios.get(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalUsers(usersResponse.data.length);

        // Fetch total slots
        const slotsResponse = await axios.get(`${API_URL}/api/slots`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const slots = slotsResponse.data;
        setTotalSlots(slots.length);

        // Calculate available and filled slots
        let availableCount = 0;
        let filledCount = 0;
        slots.forEach((slot) => {
          if (slot.isAvailable) {
            availableCount++;
          } else {
            filledCount++;
          }
        });

        setAvailableSlots(availableCount);
        setFilledSlots(filledCount);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="bg-primary p-3 w-full">
      <h1 className="text-white text-2xl mb-2">Dashboard</h1>
      <div className="flex justify-around">
        <div className="bg-white gap-4 p-3 space-y flex justify-between rounded-md -mb-10">
          <div className="mb-4">
            <h1 className="text-2xl">Total Users</h1>
            <span className="text-3xl">
              {loading ? (
                <span className="text-lg">Loading...</span>
              ) : (
                totalUsers
              )}
            </span>
          </div>
          <div className=" bg-purple-300 h-max p-1 rounded">
            <TfiBag className="text-xl" />
          </div>
        </div>
        <div className="bg-white gap-4 p-3 space-y flex justify-between rounded-md -mb-10">
          <div className="mb-4">
            <h1 className="text-2xl">Total Slots</h1>
            <span className="text-3xl">
              {loading ? (
                <span className="text-lg">Loading...</span>
              ) : (
                totalSlots
              )}
            </span>
          </div>
          <div className=" bg-purple-300 h-max p-1 rounded">
            <TfiBag className="text-xl" />
          </div>
        </div>
        <div className="bg-white gap-4 p-3 flex justify-between rounded-md -mb-10">
          <div className="mb-4">
            <h1 className="text-2xl">Available Slots</h1>
            <span className="text-3xl">
              {loading ? (
                <span className="text-lg">Loading...</span>
              ) : (
                availableSlots
              )}
            </span>
          </div>
          <div className=" bg-purple-300 h-max p-1 rounded">
            <TfiBag className="text-xl" />
          </div>
        </div>
        <div className="bg-white gap-4 p-3 flex justify-between rounded-md -mb-10">
          <div className="mb-4">
            <h1 className="text-2xl">Filled Slots</h1>
            <span className="text-3xl">
              {loading ? (
                <span className="text-lg">Loading...</span>
              ) : (
                filledSlots
              )}
            </span>
          </div>
          <div className=" bg-purple-300 h-max p-1 rounded">
            <TfiBag className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
