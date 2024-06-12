import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([
        { id: 1, vehicleNumber: 'ABC123', name: 'Kanchan', email: 'kanchan@example.com', inTime: '08:00', outTime: '16:00', status: 'Active' },
        { id: 2, vehicleNumber: 'DEF456', name: 'Gandu', email: 'gandu@example.com', inTime: '09:00', outTime: '17:00', status: 'Inactive' },
        { id: 3, vehicleNumber: 'GHI789', name: 'Kyu', email: 'kyu@example.com', inTime: '10:00', outTime: '18:00', status: 'Active' },
        { id: 4, vehicleNumber: 'JKL012', name: 'Hai', email: 'hai@example.com', inTime: '11:00', outTime: '19:00', status: 'Inactive' },
    ]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const openModal = (user, content) => {
        setSelectedUser(user);
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setModalContent('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const user = {
            id: selectedUser ? selectedUser.id : Date.now(),
            vehicleNumber: formData.get('vehicleNumber'),
            name: formData.get('name'),
            email: formData.get('email'),
            inTime: formData.get('inTime'),
            outTime: formData.get('outTime'),
            status: formData.get('status')
        };

        try {
            if (modalContent === 'addUser') {
                setUsers([...users, user]);
                await axios.post('/api/users/', user);
            } else if (modalContent === 'editUser') {
                setUsers(users.map(u => (u.id === user.id ? user : u)));
                await axios.put(`/api/users/${user.id}/, user`);
            }
            closeModal();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="logo">Space-Sync</div>
                <ul className="menu">
                    <li className="menu-item"><a href="/admin-dashboard">Dashboard</a></li>
                    <li className="menu-item active"><a href="/manage-users">Users</a></li>
                    <li className="menu-item"><a href="/slots">Slots</a></li>
                    <li className="menu-item"><a href="/parking-rate">Parking Rate</a></li>
                    <li className="menu-item"><a href="/report">Report</a></li>
                    <li className="menu-item"><a href="/profile">Profile</a></li>
                    <li className="menu-item"><a href="/settings">Settings</a></li>
                    <li className="menu-item"><a href="/logout">Log Out</a></li>
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <h1>Manage Users</h1>
                </header>
                <section>
                    <button className="add-user-btn" onClick={() => openModal(null, 'addUser')}>Add User</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Vehicle Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>In-Time</th>
                                <th>Out-Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td contentEditable onBlur={(e) => {
                                        const newVehicleNumber = e.target.innerText;
                                        setUsers(users.map(u => (u.id === user.id ? { ...u, vehicleNumber: newVehicleNumber } : u)));
                                    }}>{user.vehicleNumber}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.inTime}</td>
                                    <td>{user.outTime}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <button onClick={() => openModal(user, 'editUser')}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
            {isModalOpen && (
                <div className="overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <form className="modal-content" onSubmit={handleSubmit}>
                            <h3>{modalContent === 'addUser' ? 'Add User' : 'Edit User'}</h3>
                            {modalContent === 'editUser' && selectedUser && (
                                <>
                                    <label>Vehicle Number:</label>
                                    <input type="text" name="vehicleNumber" defaultValue={selectedUser.vehicleNumber} required />
                                </>
                            )}
                            <label>Name:</label>
                            <input type="text" name="name" defaultValue={selectedUser ? selectedUser.name : ''} required />
                            <label>Email:</label>
                            <input type="email" name="email" defaultValue={selectedUser ? selectedUser.email : ''} required />
                            <label>In-Time:</label>
                            <input type="time" name="inTime" defaultValue={selectedUser ? selectedUser.inTime : ''} required />
                            <label>Out-Time:</label>
                            <input type="time" name="outTime" defaultValue={selectedUser ? selectedUser.outTime : ''} required />
                            <label>Status:</label>
                            <select name="status" defaultValue={selectedUser ? selectedUser.status : ''} required>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <button type="submit">Save</button>
                            <button type="button" onClick={closeModal}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;