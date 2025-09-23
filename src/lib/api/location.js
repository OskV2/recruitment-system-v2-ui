import { api } from '@/lib/api/axios';

// Fetch all locations
export const getAllLocations = async () => {
  return await api.get(`/location`);
};

export const createLocation = async ({data}) => {
  return await api.post(`/location`, data);
};

export const editLocation = async ({id, data}) => {
  return await api.patch(`/location/${id}`, data);
};

export const deleteLocation = async ({id}) => {
  return await api.delete(`/location/${id}`);
};