import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllRecruitmentProcesses,
  createRecruitmentProcess,
  editRecruitmentProcess,
  deleteRecruitmentProcess
} from '../api/recruitment-process'

export function useRecruitmentProcesses() {
  return useQuery({
    queryKey: ['rp'],
    queryFn: getAllRecruitmentProcesses,
  });
}

export function useCreateRecruitmentProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecruitmentProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rp'] });
    },
  });
}

export function useEditRecruitmentProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editRecruitmentProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rp'] });
    },
  });
}

export function useDeleteRecruitmentProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecruitmentProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rp'] });
    },
  });
}
