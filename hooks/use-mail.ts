import { AuthContext } from "@/app/auth-provider";
import { Mail } from "@prisma/client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const useMail = () => {
  const { user } = useContext(AuthContext);
  const mail = user?.email;
  const [mails, setMails] = useState<Mail[]>([]);
  const [inboxMails, setInboxMails] = useState<Mail[]>([]);
  const [sentMails, setSentMails] = useState<Mail[]>([]);
  useEffect(() => {
    axios.get<Mail[]>(`/api/mails/${mail}`).then((res) => setMails(res.data));
  }, [mail]);

  useEffect(() => {
    setInboxMails(mails.filter((m) => m.sender !== mail));
    setSentMails(mails.filter((m) => m.sender === mail));
  }, [mails]);

  return { inboxMails, sentMails };
};

export default useMail;
