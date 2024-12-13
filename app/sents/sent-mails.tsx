import { Mail } from "@prisma/client";
import SentItem from "../../components/sent-item";

interface Props {
  mails: Mail[];
}

const SentMails = ({ mails }: Props) => {
  return (
    <div>
      {mails?.map((mail) => (
        <SentItem mail={mail} key={mail.id} />
      ))}
    </div>
  );
};

export default SentMails;
