import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default {
  getUsers: (params) => axios.get(`${BASE}/api/users`, { params }),
  createUser: (data) => axios.post(`${BASE}/api/users`, data),
  updateUser: (id, data) => axios.put(`${BASE}/api/users/${id}`, data),
  deleteUser: (id) => axios.delete(`${BASE}/api/users/${id}`),
};
