import { Mail } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMail = (id: string) =>
  useQuery({
    queryKey: ["mail", id],
    queryFn: () =>
      axios.get<Mail>(`/api/mails/?id=${id}`).then((res) => res.data),
    staleTime: 10 * 1000,
  });

export default useMail;
