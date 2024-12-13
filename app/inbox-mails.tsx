"use client";
import useMails from "@/hooks/use-mails";
import InboxItem from "../components/inbox-item";

const InboxMails = () => {
  const { inboxMails } = useMails();
  return (
    <div>
      {inboxMails?.map((mail) => (
        <InboxItem mail={mail} key={mail.id} />
      ))}
    </div>
  );
};

export default InboxMails;
