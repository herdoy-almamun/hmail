import { AuthContext } from "@/app/auth-provider";
import { Mail } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

const useMail = () => {
  const { user } = useContext(AuthContext);
  const mail = user?.email;

  const {
    data: mails = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mails", mail],
    queryFn: () =>
      axios.get<Mail[]>(`/api/mails/${mail}`).then((res) => res.data),
    enabled: !!mail, // Ensures the query runs only when `mail` is available
  });

  const inboxMails = mails.filter((m) => m.sender !== mail);
  const sentMails = mails.filter((m) => m.sender === mail);

  return { inboxMails, sentMails, isLoading, isError };
};

export default useMail;
