import { AuthContext } from "@/app/auth-provider";
import { searchInboxMails, searchSentMails } from "@/lib/utils";
import { useMailQueryStory } from "@/store";
import { Mail } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

const useMails = () => {
  const { user } = useContext(AuthContext);
  const subject = useMailQueryStory((s) => s.subject);
  const mail = user?.email;

  const {
    data: mails = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mails", mail],
    queryFn: () =>
      axios.get<Mail[]>(`/api/mails/${mail}`).then((res) => res.data),
    enabled: !!mail,
  });

  const inboxMails = searchInboxMails(mails, subject, mail!);
  const sentMails = searchSentMails(mails, subject, mail!);

  return { inboxMails, sentMails, mails, isLoading, isError };
};

export default useMails;
