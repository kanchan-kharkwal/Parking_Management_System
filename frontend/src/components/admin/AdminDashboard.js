// frontend/src/components/admin/AdminDashboard.js
import React, {useEffect, useState} from 'react';
import './AdminDashboard.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });

    axios.get('http://localhost:8000/api/parking-slots/')
      .then(response => {
        setSlots(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the slots!', error);
      });
  }, []);

    return (
        <div className="admin-dashboard-container">
            <div className="sidebar">
                <h1 className="logo">Admin</h1>
                <ul className="menu">
                    <li className="menu-item active"><Link to="/admin-dashboard">Dashboard</Link></li>
                    <li className="menu-item"><Link to="/manage-users">Users</Link></li>
                    <li className="menu-item"><Link to="#">Slots</Link></li>
                    <li className="menu-item"><Link to="#">Parking Rate</Link></li>
                    <li className="menu-item"><Link to="#">Report</Link></li>
          
                    <li className="menu-item"><Link to="#">Profile</Link></li>
                    <li className="menu-item"><Link to="#">Settings</Link></li>
                    <li className="menu-item"><Link to="#">Log Out</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="dashboard-header">
                    <h2>Dashboard </h2>
                    <div className="stats">
                        <div className="stat">
                            <p className="stat-value">{users.length}</p>
                            <p className="stat-label">Total Users</p>
                        </div>
                        <div className="stat">
                            <p className="stat-value">{slots.length}</p>
                            <p className="stat-label">Total Slots</p>
                        </div>
                        <div className="stat">
                            <p className="stat-value">{slots.filter(slot => !slot.is_occupied).length}</p>
                            <p className="stat-label">Available Slots</p>
                        </div>
                        <div className="stat">
                            <p className="stat-value">{slots.filter(slot => slot.is_occupied).length}</p>
                            <p className="stat-label">Filled Slots</p>
                        </div>
                    </div>
                </div>
                <div className="recent-activity">
                    <h2>Recent User Activity</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Vehicle No</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.vehicle_number}</td>
                    <td>{user.contact_info}</td>
                  </tr>
                ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;