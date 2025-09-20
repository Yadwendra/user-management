import React, { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

export default function UserForm({ onSaved, editingUser, onCancel }) {
  const emptyForm = { name: '', email: '', role: 'Developer', status: 'active' };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(editingUser || emptyForm);
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await api.updateUser(form._id, form);
        toast.success('User updated!', { autoClose: 2000 });
      } else {
        await api.createUser(form);
        toast.success('User created!', { autoClose: 2000 });
      }
      onSaved();
      setForm(emptyForm);
    } catch (err) {
      toast.error('Error: ' + (err.response?.data?.error || err.message), { autoClose: 2000 });
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{form._id ? 'Edit User' : 'Add User'}</h2>

      <input
        required
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        required
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option>Developer</option>
        <option>Admin</option>
        <option>Designer</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div className="actions">
        <button type="submit">Save</button>
        {form._id && (
          <button type="button" onClick={() => { setForm(emptyForm); onCancel(); }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
