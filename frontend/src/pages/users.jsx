import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Table from "../ui/table";
import Edit from "../components/users/edit";
import Modal from "../ui/modal";
import { API_URL } from "../constants/url";

const TOKEN_KEY = "_auth_token";
const columns = ["NAME", "EMAIL", "STATUS", "ACTION"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error.response.status);
        setError(error.response.data.message);
        if (error.response.status === 401 || error.response.status === 403) {
          window.location.href = "/auth/logout";
        }
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  }, [users, searchTerm]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (userId) => {
    setEditUserId(userId);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.response.data.message);
    }
  };

  const mappedUsers = filteredUsers.map((user) => ({
    "ID NUMBER": user._id.substring(0, 6).toUpperCase(),
    NAME: user.name,
    EMAIL: user.email,
    STATUS: user.role,
    ACTION: <Action userId={user._id} onDelete={handleDelete} onEdit={handleEdit} />,
  }));

  return (
    <div className="w-full bg-primary">
      <div className="p-10">
        <h1 className="text-3xl text-white">Users</h1>
        <input
          type="text"
          className="mt-4 w-full p-2 rounded border border-gray-300"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white">
        <Table error={error} loading={loading} data={mappedUsers} columns={columns} />
      </div>
      <Modal isOpen={editUserId !== null} onClose={() => setEditUserId(null)}>
        <Edit userId={editUserId} onClose={() => setEditUserId(null)} onUpdate={handleUpdate} />
      </Modal>
    </div>
  );
};

const Action = ({ userId, onDelete, onEdit }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        className="px-4 py-2 bg-gray-300 text-black rounded"
        onClick={toggleDropdown}
      >
        Actions
      </button>
      {dropdownOpen && (
        <div className="absolute z-50 right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <button
            onClick={() => {
              onEdit(userId);
              setDropdownOpen(false);
            }}
            className="block px-4 py-2 text-left w-full text-black hover:bg-gray-200"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(userId);
              setDropdownOpen(false);
            }}
            className="block px-4 py-2 text-left w-full text-black hover:bg-gray-200"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
