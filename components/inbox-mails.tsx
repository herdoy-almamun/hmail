import { Mail } from "@prisma/client";
import InboxItem from "./inbox-item";

interface Props {
  mails: Mail[];
}

const InboxMails = ({ mails }: Props) => {
  return (
    <div>
      {mails.map((mail) => (
        <InboxItem mail={mail} key={mail.id} />
      ))}
    </div>
  );
};

export default InboxMails;
