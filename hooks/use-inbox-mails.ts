import { useInboxMailQueryStory } from "@/store";
import { Mail } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ResponseInterface {
  data: Mail[];
  count: number;
}

export const useInboxMails = (user: string) => {
  const page = useInboxMailQueryStory((s) => s.page);
  const subject = useInboxMailQueryStory((s) => s.subject);
  const pageSize = useInboxMailQueryStory((s) => s.pageSize);
  return useQuery<ResponseInterface>({
    queryKey: ["inbox-mails", page, subject],
    queryFn: () =>
      axios
        .get("/api/inbox-mails", {
          params: { page, subject, pageSize, user },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};
