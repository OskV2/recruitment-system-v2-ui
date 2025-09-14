import { api } from '@/lib/api/axios';

// Fetch all locations
export const getAllLocations = async () => {
  return await api.get(`/location`);
};

export const createLocation = async () => {
  return await api.post(`/location`);
};

export const editLocation = async (id) => {
  return await api.patch(`/location/${id}`);
};

export const deleteLocation = async (id) => {
  return await api.delete(`/location/${id}`);
};