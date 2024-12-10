import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = (mail: string) =>
  useQuery({
    queryKey: ["user", mail],
    queryFn: () =>
      axios.get<User>(`/api/users/${mail}`).then((res) => res.data),
    staleTime: 10 * 1000,
  });

export default useUser;
