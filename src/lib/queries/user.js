import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, getAllUsers } from "../api/user";

export function useGetUser(id) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
    enabled: !!id  //  Don’t run if id is undefined/null
  });
}