import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE || 'https://user-management-y2ov.onrender.com';

export default {
  getUsers: (params) => axios.get(`${BASE}/api/users`, { params }),
  createUser: (data) => axios.post(`${BASE}/api/users`, data),
  updateUser: (id, data) => axios.put(`${BASE}/api/users/${id}`, data),
  deleteUser: (id) => axios.delete(`${BASE}/api/users/${id}`),
};
