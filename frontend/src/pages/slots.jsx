import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import AreaForm from "../components/area/AreaForm";
import Modal from "../ui/modal";
import { FiCheck, FiTrash } from "react-icons/fi";
import car from "../assets/images/image.png";

const TOKEN_KEY = "_auth_token";
export default function Slots() {
  const [areas, setAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const token = localStorage.getItem(TOKEN_KEY);
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
  }, []);

  const handleAreaCreated = (newArea) => {
    setLoading(true);
    window.location.reload();

    const fetchSlotsForNewArea = async () => {
      const slotsResponse = await axios.get(
        `${API_URL}/api/areas/${newArea.area._id}/slots`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAreas([...areas, { ...newArea, slots: slotsResponse.data }]);
      setLoading(false);
    };
    fetchSlotsForNewArea();
  };

  const handleDeleteArea = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/areas/${areaToDelete._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setAreas(
        areas.filter((area) => area._id !== areaToDelete._id),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsDeleteModalOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting area", error);
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
  // Function to handle slot click and show modal
  const handleSlotClick = async (areaId, slotId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/areas/${areaId}/slots/${slotId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setSelectedSlot(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching slot information", error);
    }
  };
  const [createBtn, setCreate] = useState(false);
  return (
    <div className="p-4 w-full flex flex-col items-end">
      <button
        className="mb-4  w-max px-4 py-2 bg-primary hover:bg-opacity-85 text-white rounded"
        onClick={() => {
          setCreate(true);
        }}
      >
        Create Parking Area
      </button>
      <Modal isOpen={createBtn} onClose={() => setCreate(false)}>
        <AreaForm
          onClose={() => setCreate(false)}
          onAreaCreated={handleAreaCreated}
        />
      </Modal>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedSlot && (
          <div className="p-6 bg-white">
            <h2 className="text-lg font-bold mb-4">Slot Information</h2>
            <p>Slot Number: {selectedSlot.slot.slotNumber}</p>
            <p>
              Status: {selectedSlot.slot.isAvailable ? "Available" : "Booked"}
            </p>
            {!selectedSlot.slot.isAvailable && (
              <p>Booked By: {selectedSlot.booking.bookedBy.name}</p>
            )}
          </div>
        )}
      </Modal>
      <div className="flex w-full flex-col gap-2">
        {loading ? (
          <div>loading...</div>
        ) : (
          areas.map((area) => (
            <div
              key={area._id}
              className="relative p-4 border rounded bg-gray-100"
            >
              <h3 className="mb-2 text-xl font-bold">Area {area.name}</h3>
              <div
                onClick={() => {
                  setAreaToDelete(area);
                  setIsDeleteModalOpen(true);
                }}
                className="absolute top-2 right-2 cursor-pointer hover:bg-red-800 bg-red-700 text-white rounded-full p-2"
              >
                <FiTrash />
              </div>

              <div className="grid md:grid-cols-6 grid-cols-4 lg:grid-cols-10 gap-2">
                {area.slots.map((slot) => (
                  <div
                    key={slot._id}
                    className={`relative cursor-pointer w-20 h-32 flex items-center justify-center ${getRandomBgColor()} bg-opacity-50 text-center rounded`}
                    onClick={() => handleSlotClick(area._id, slot._id)}
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

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="p-4 bg-white">
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this area?</p>
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 text-black rounded"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-red-700 text-white rounded"
              onClick={handleDeleteArea}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
