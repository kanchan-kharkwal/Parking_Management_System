import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";
import Modal from "../ui/modal";
import axios from "axios";
import { API_URL } from "../constants/url";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
  });
  const [password, setPassword] = useState({
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("_auth_token");

  const handleEditModalOpen = () => {
    setEditedUser({
      name: user.name,
      email: user.email,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handlePasswordModalOpen = () => {
    setPassword({
      password: "",
    });
    setPasswordModalOpen(true);
  };

  const handlePasswordModalClose = () => {
    setPasswordModalOpen(false);
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditUser = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/api/users/${user._id}`,
        editedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "UPDATE_USER", payload: response.data });
      setEditModalOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "An error occurred");
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/api/users/${user._id}`,
        { password: password.password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setPasswordModalOpen(false);
      alert("Password changed successfully.");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "An error occurred");
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "LOGOUT" }); // Example of logging out user after deletion
      setLoading(false);
      // Redirect to login or home page after deletion
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <div className="flex items-center mb-4">
        <div className="text-gray-600 w-1/4">Name:</div>
        <div className="flex items-center">
          <div className="font-semibold">{user.name}</div>
          <FiEdit
            className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={handleEditModalOpen}
          />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="text-gray-600 w-1/4">Email:</div>
        <div className="flex items-center">
          <div className="font-semibold">{user.email}</div>
          <FiEdit
            className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={handleEditModalOpen}
          />
        </div>
      </div>
      {/* Additional settings */}
      <div className="flex items-center mb-4">
        <div className="text-gray-600 w-1/4">Change Password:</div>
        <button
          className="text-blue-500 hover:underline"
          onClick={handlePasswordModalOpen}
        >
          Change Password
        </button>
      </div>
      <div className="flex items-center mb-4">
        <div className="text-gray-600 w-1/4">Delete Account:</div>
        <FiTrash
          className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
          onClick={handleDeleteModalOpen}
        />
      </div>

      {/* Modals */}
      <Modal isOpen={editModalOpen} onClose={handleEditModalClose}>
        <div className="p-4 bg-white">
          <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              className={`px-4 py-2 bg-primary text-white rounded mr-2 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleEditUser}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded"
              onClick={handleEditModalClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={deleteModalOpen} onClose={handleDeleteModalClose}>
        <div className="p-4 bg-white">
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete your account?</p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end mt-4">
            <button
              className={`mr-2 px-4 py-2 bg-gray-300 text-black rounded ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleDeleteModalClose}
              disabled={loading}
            >
              No
            </button>
            <button
              className={`px-4 py-2 bg-red-700 text-white rounded ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleDeleteUser}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={passwordModalOpen} onClose={handlePasswordModalClose}>
        <div className="p-4 bg-white">
          <h2 className="text-lg font-bold mb-4">Change Password</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="currentPassword"
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="New Password"
              name="password"
              value={password.password}
              onChange={handlePasswordChange}
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              className={`px-4 py-2 bg-primary text-white rounded mr-2 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded"
              onClick={handlePasswordModalClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
