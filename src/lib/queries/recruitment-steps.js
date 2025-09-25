import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllRecruitmentSteps,
  createRecruitmentStep,
  editRecruitmentStep,
  deleteRecruitmentStep,
} from '../api/recruitment-steps';

export function useRecruitmentSteps() {
  return useQuery({
    queryKey: ['rs'],
    queryFn: getAllRecruitmentSteps,
  });
}

export function useCreateRecruitmentStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecruitmentStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rs'] });
    },
  });
}

export function useEditRecruitmentStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editRecruitmentStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rs'] });
    },
  });
}

export function useDeleteRecruitmentStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecruitmentStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rs'] });
    },
  });
}
