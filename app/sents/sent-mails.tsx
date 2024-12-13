"use client";
import useMails from "@/hooks/use-mails";
import SentItem from "../../components/sent-item";

const SentMails = () => {
  const { sentMails } = useMails();
  return (
    <div>
      {sentMails?.map((mail) => (
        <SentItem mail={mail} key={mail.id} />
      ))}
    </div>
  );
};

export default SentMails;
