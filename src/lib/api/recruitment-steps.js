import { api } from '@/lib/api/axios';

export const getAllRecruitmentSteps = async () => {
  return await api.get(`/recruitment-step`);
};

export const createRecruitmentStep = async ({data}) => {
  return await api.post(`/recruitment-step`, data);
};

export const editRecruitmentStep = async ({id, data}) => {
  return await api.patch(`/recruitment-step/${id}`, data);
};

export const deleteRecruitmentStep = async ({id}) => {
  return await api.delete(`/recruitment-step/${id}`);
};