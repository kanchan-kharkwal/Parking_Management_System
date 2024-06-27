import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiUsers,
  FiClipboard,
  FiDollarSign,
  FiSettings,
  FiExternalLink,
} from "react-icons/fi";
import { TfiBarChart } from "react-icons/tfi";

import logo from "../../assets/images/logo.jpg";

const Sidebar = () => {
  const menuItems = [
    { icon: <TfiBarChart />, label: "Dashboard", path: "/" },
    { icon: <FiUsers />, label: "users", path: "/users" },
    { icon: <FiClipboard />, label: "View Slots", path: "/slots" },
    {
      icon: <FiDollarSign />,
      label: "Customers",
      path: "/customers",
    },
    { icon: <FiSettings />, label: "Settings", path: "/Settings" },
    {
      icon: <FiExternalLink  />,
      label: "Log Out",
      path: "/auth/logout",
    },
  ];

  return (
    <aside className=" bg-gray-200  mt-4 h-[100vh]  w-64 mb-0  space-y-2">
      <NavLink className="bg-white  flex items-center pl-10 py-3  cursor-pointer ">
        <img className="w-10" src={logo} /> Space Sync
      </NavLink>
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            ` flex items-center space-x-4 p-6 py-3  rounded-lg cursor-pointer  ${
              isActive
                ? "bg-primary"
                : " bg-white hover:bg-primary hover:bg-opacity-10"
            }`
          }
        >
          <div className={`  flex items-center`}>
            <span className="text-lg"> {item.icon}</span>
            <span>{item.label}</span>
          </div>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
