import { AuthContext } from "@/app/auth-provider";
import { useMailQueryStory } from "@/store";
import { Mail } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

// Helper function to fetch mails
const fetchMails = (url: string) => {
  return axios.get<Mail[]>(url).then((res) => res.data);
};

const useMails = () => {
  const { user } = useContext(AuthContext);
  const subjectInboxMail = useMailQueryStory((s) => s.subjectInboxMail);
  const subjectSentMail = useMailQueryStory((s) => s.subjectSentMail);
  const pageNumberInboxMail = useMailQueryStory((s) => s.pageNumberInboxMail);
  const pageNumberSentMail = useMailQueryStory((s) => s.pageNumberSentMail);

  const mail = user?.email;

  // Query for all mails
  const { data: mails } = useQuery<Mail[]>({
    queryKey: ["mails", mail],
    queryFn: () => fetchMails(`/api/mails/${mail}`),
    enabled: !!mail,
  });

  // Query for inbox mails
  const { data: inboxMails } = useQuery<Mail[]>({
    queryKey: ["inbox-mails", mail, pageNumberInboxMail, subjectInboxMail],
    queryFn: () => {
      const params = new URLSearchParams({
        receiver: mail || "",
        page: pageNumberInboxMail.toString(),
        pageSize: "10",
        subject: subjectInboxMail || "",
      });
      return fetchMails(`/api/filter-mails?${params.toString()}`);
    },
    enabled: !!mail,
  });

  // Query for inbox mails
  const { data: sentMails } = useQuery<Mail[]>({
    queryKey: ["sent-mails", mail, pageNumberSentMail, subjectSentMail],
    queryFn: () => {
      const params = new URLSearchParams({
        sender: mail || "",
        page: pageNumberSentMail.toString(),
        pageSize: "10",
        subject: subjectSentMail || "",
      });
      return fetchMails(`/api/filter-mails?${params.toString()}`);
    },
    enabled: !!mail,
  });

  return { inboxMails, sentMails, mails };
};

export default useMails;
