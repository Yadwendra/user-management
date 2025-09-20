import React from 'react';
import api from '../api';
import { toast } from 'react-toastify';

export default function UserTable({ users, onEdit, onDeleted }) {
  const handleDelete = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
          <button
            onClick={async () => {
              try {
                await api.deleteUser(id);
                toast.dismiss(); 
                toast.success('User deleted successfully!', { autoClose: 2000 });
                onDeleted();
              } catch (err) {
                toast.dismiss();
                toast.error('Error deleting user: ' + (err.response?.data?.error || err.message), { autoClose: 2000 });
              }
            }}
            style={{
              background: "#f44336",
              border: "none",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              background: "#ccc",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  return (
    <div className="card table">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.bio}</td>
              <td className="actions-cell">
                <button className="edit" onClick={() => onEdit(user)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
