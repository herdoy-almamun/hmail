import { useSentMailQueryStory } from "@/store";
import { Mail } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ResponseInterface {
  data: Mail[];
  count: number;
}

export const useSentMails = (user: string) => {
  const page = useSentMailQueryStory((s) => s.page);
  const subject = useSentMailQueryStory((s) => s.subject);
  const pageSize = useSentMailQueryStory((s) => s.pageSize);
  return useQuery<ResponseInterface>({
    queryKey: ["sent-mails", page, subject],
    queryFn: () =>
      axios
        .get("/api/sent-mails", {
          params: { page, subject, pageSize, user },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};
