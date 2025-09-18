import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllLocations, createLocation, editLocation, deleteLocation } from "../api/location";

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getAllLocations,
  });
}

export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}

export function useEditLocation() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: editLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}

export function useDeleteLocation() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}