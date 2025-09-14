import { api } from '@/lib/api/axios';

// Fetch all locations
export const loginUser = async (data) => {
  return await api.post(`/auth/login`, data);
};

export const logoutUser = async () => {
  return await api.post(`/auth/logout`)
}

