import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllContractTypes, createContractType, editContractType, deleteContractType } from "../api/contract-type";

export function useContracType() {
  return useQuery({
    queryKey: ["contract-type"],
    queryFn: getAllContractTypes,
  });
}

export function useCreateContracType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContractType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract-type"] });
    },
  });
}

export function useEditContractType() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: editContractType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract-type"] });
    },
  });
}

export function useDeleteContractType() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: deleteContractType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract-type"] });
    },
  });
}