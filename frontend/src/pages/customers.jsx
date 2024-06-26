import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../ui/table";
import { API_URL } from "../constants/url";
import moment from "moment";

const TOKEN_KEY = "_auth_token";
const columns = [
  "VEHICLE NUMBER",
  "NAME",
  "EMAIL",
  "LAST IN TIME",
  "LAST OUT TIME",
  "BOOKING COUNT",
];

const Customers = ({ dashboard }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const users = response.data;

        const customersWithBookings = await Promise.all(
          users.map(async (user) => {
            const bookingsResponse = await axios.get(
              `${API_URL}/api/bookings/user/${user._id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return {
              ...user,
              vehicleNo: bookingsResponse.data[0]?.vehicleNo,
              startTime: moment(
                bookingsResponse.data[0]?.startTime || null
              ).format("DD/MM/YYYY hh:mm a"),
              endTime: moment(bookingsResponse.data[0]?.endTime || null).format(
                "DD/MM/YYYY hh:mm a"
              ),
              bookingCount: bookingsResponse.data.length,
            };
          })
        );

        const sortedCustomers = customersWithBookings.sort(
          (a, b) => b.bookingCount - a.bookingCount
        );

        setCustomers(sortedCustomers);
        setFilteredUsers(sortedCustomers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error.response?.data?.message || "Error fetching customers");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  const mappedCustomers = filteredUsers.map(
    (customer) =>
      customer.bookingCount > 0 && {
        "VEHICLE NUMBER": customer?.vehicleNo,
        NAME: customer.name,
        EMAIL: customer.email,
        "LAST IN TIME": customer.startTime,
        "LAST OUT TIME": customer.endTime,
        "BOOKING COUNT": customer.bookingCount,
      }
  );

  useEffect(() => {
    // Filter users based on search term
    const filteredUsers = customers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  }, [customers, searchTerm]);

  return (
    <div className={`w-full ${dashboard ? "" : "bg-primary"} `}>
      {!dashboard && (
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
      )}
      <h2
        className={`px-10 text-2xl font-bold mb-4 ${
          dashboard ? "text-black" : "text-white"
        } `}
      >
        Customers ({mappedCustomers.length})
      </h2>
      <div className="bg-white">
        <Table
          error={error}
          loading={loading}
          data={mappedCustomers}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Customers;
