import { api } from '@/lib/api/axios';

export const getAllContractTypes = async () => {
  return await api.get(`/contract`);
};

export const createContractType = async () => {
  return await api.post(`/contract`);
};

export const editContractType = async (id) => {
  return await api.patch(`/contract/${id}`);
};

export const deleteContractType = async (id) => {
  return await api.delete(`/contract/${id}`);
};