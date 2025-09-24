import { api } from '@/lib/api/axios';

export const getAllContractTypes = async () => {
  return await api.get(`/contract`);
};

export const createContractType = async ({ data }) => {
  return await api.post(`/contract`, data);
};

export const editContractType = async ({id, data}) => {
  return await api.patch(`/contract/${id}`, data);
};

export const deleteContractType = async ({id}) => {
  return await api.delete(`/contract/${id}`);
};