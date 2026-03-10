import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pooja } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllPoojas() {
  const { actor, isFetching } = useActor();
  return useQuery<Pooja[]>({
    queryKey: ["poojas"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPoojas();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      devoteeName,
      phoneNumber,
      poojaId,
      preferredDate,
    }: {
      devoteeName: string;
      phoneNumber: string;
      poojaId: bigint;
      preferredDate: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitBooking(
        devoteeName,
        phoneNumber,
        poojaId,
        preferredDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
