import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import api from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");

  // users ko load karna
  const loadUsers = async () => {
    const res = await api.getUsers({ q: query, role });
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, [query, role]);

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* Search & Filter */}
      <div className="top">
        <input
          placeholder="Search name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All roles</option>
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
        </select>
      </div>

      {/* Form & Table */}
      <div className="grid">
        <UserForm
          editingUser={editingUser}
          onSaved={() => {
            setEditingUser(null);
            loadUsers();
          }}
          onCancel={() => setEditingUser(null)}
        />
        <UserTable
          users={users}
          onEdit={(u) => setEditingUser(u)}
          onDeleted={loadUsers}
        />
      </div>

      {/* Toast ek hi jagah */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
