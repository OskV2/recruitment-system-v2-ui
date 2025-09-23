import { api } from '@/lib/api/axios';

export const getUser = async (id) => {
  return await api.get(`/users/${id}`);
};

export const getAllUsers = async () => {
  return await api.get(`/users`)
}