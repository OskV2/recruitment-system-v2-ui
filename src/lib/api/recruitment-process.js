import { api } from '@/lib/api/axios';

export const getAllRecruitmentProcesses = async () => {
  return await api.get(`/recruitment-process`);
};

export const createRecruitmentProcess = async ({data}) => {
  return await api.post(`/recruitment-process`, data);
};

export const editRecruitmentProcess = async ({id, data}) => {
  return await api.patch(`/recruitment-process/${id}`, data);
};

export const deleteRecruitmentProcess = async ({id}) => {
  return await api.delete(`/recruitment-process/${id}`);
};