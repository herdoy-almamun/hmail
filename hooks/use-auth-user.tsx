import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAuthUser = (id: string) =>
  useQuery({
    queryKey: ["auth-user", id],
    queryFn: () =>
      axios.get<User>(`/api/user/?id=${id}`).then((res) => res.data),
    staleTime: 10 * 1000,
  });

export default useAuthUser;
