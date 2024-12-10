import useUser from "@/hooks/use-user";
import { Mail } from "@prisma/client";
import { Avatar, Flex } from "@radix-ui/themes";
import { Ellipsis, Mail as MailIcon, MailOpen } from "lucide-react";
import Link from "next/link";

interface Props {
  mail: Mail;
}

const SentItem = ({ mail }: Props) => {
  const { data: receiver } = useUser(mail.receiver);
  return (
    <Flex align="center" justify="between" py="2" px="4" className="border-b">
      <Link href={`/${mail.id}`} className="flex items-center flex-1 gap-10">
        <Flex align="center" gap="2">
          <Avatar
            size="1"
            src={receiver?.image!}
            fallback={receiver?.firstName!}
          />
          <p>
            {receiver?.firstName} {receiver?.lastName}{" "}
          </p>
        </Flex>
        <p className="hidden lg:block"> {mail.subject} </p>
      </Link>
      <Flex align="center" gap="4">
        {mail.isReaded ? <MailOpen /> : <MailIcon />}
        <Ellipsis />
      </Flex>
    </Flex>
  );
};

export default SentItem;
