import axios from "axios";
import React from "react";
import { API_URL } from "../constants/url";

const columns = ["Passenger Name", "Phone Contact", "Status"];

const TripDetail = ({ data, id, status }) => {
  const token = localStorage.getItem("_auth_token");

  const startTrip = () => {
    if (data.data.length > 0)
      axios
        .put(
          `${API_URL}/api/trips/${id}`,
          {
            data: {
              status: status === "booked" ? "ongoing" : "completed",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
  };

  return (
    <div>
      {data?.data.length > 0 ? (
        <div className="p-4 w-full justify-between bg-whiteGreen flex flex-col md:flex-row">
          <table className="w-max border-collapse table">
            <thead className="table-header-group">
              <tr className="table-row">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="p-2 font-semibold text-left table-cell"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-row-group">
              {data?.data.map((ticket, ticketIndex) => (
                <React.Fragment key={ticketIndex}>
                  {ticket?.attributes?.passengers.data.map(
                    (passenger, passengerIndex) => (
                      <tr key={passengerIndex} className="table-row">
                        <td className="p-2 table-cell">
                          {passenger.attributes.fullName}
                        </td>
                        <td className="p-2 table-cell">
                          {passenger.attributes.phoneNumber}
                        </td>
                        <td className="p-2 table-cell">
                          {ticket.attributes.status}
                        </td>
                      </tr>
                    )
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div>
            {status === "booked" ? (
              <button
                onClick={startTrip}
                className="w-max p-1 px-2 bg-seaGreen hover:bg-opacity-70"
              >
                Start Trip
              </button>
            ) : status === "ongoing" ? (
              <button
                onClick={startTrip}
                className="w-max p-1 px-2 bg-primary text-white hover:bg-opacity-70"
              >
                Complete Trip
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className=" bg-yellow-500 pl-5 text-red-500 bg-opacity-45">
          No data available
        </div>
      )}
    </div>
  );
};

export default TripDetail;
