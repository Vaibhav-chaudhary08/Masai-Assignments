import React, { useState, useEffect } from "react";
import axios from "axios";

const FIREBASE_URL = "https://my-firebase-db.firebaseio.com/users";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${FIREBASE_URL}.json`);
      const formattedUsers = response.data
        ? Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }))
        : [];
      setUsers(formattedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateForm = () => {
    if (!name.trim() || !email.trim()) {
      setError("Both fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;
    try {
      const newUser = { name, email };
      await axios.post(`${FIREBASE_URL}.json`, newUser);
      fetchUsers();
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const handleEditUser = async () => {
    if (!validateForm()) return;
    try {
      const updatedUser = { name, email };
      await axios.patch(`${FIREBASE_URL}/${editingId}.json`, updatedUser);
      fetchUsers();
      setEditingId(null);
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${FIREBASE_URL}/${id}.json`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {editingId ? (
          <button onClick={handleEditUser}>Update User</button>
        ) : (
          <button onClick={handleAddUser}>Add User</button>
        )}
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => { setEditingId(user.id); setName(user.name); setEmail(user.email); }}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
