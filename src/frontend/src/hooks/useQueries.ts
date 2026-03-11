import { useQuery } from "@tanstack/react-query";
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
