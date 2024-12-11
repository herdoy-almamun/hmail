import { Reply } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useReplays = (id: string) =>
  useQuery<Reply[]>({
    queryKey: ["replays", id],
    queryFn: () =>
      axios.get<Reply[]>(`/api/replays/?id=${id}`).then((res) => res.data),
    staleTime: 10 * 1000,
  });

export default useReplays;
