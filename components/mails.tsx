"use client";

import { Mail } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Ellipsis, Mail as MailIcon } from "lucide-react";

interface Props {
  mails: Mail[];
}

const Mails = ({ mails }: Props) => {
  return (
    <div>
      {mails.map((mail) => (
        <Flex
          key={mail.id}
          align="center"
          justify="between"
          py="2"
          px="4"
          className="border-b hover:bg-gray-200 transition-all hover:cursor-pointer"
        >
          <h1> {mail.sender} </h1>
          <p className="hidden lg:block"> {mail.body?.slice(0, 50)} ... </p>
          <Flex align="center" gap="4">
            <MailIcon />
            <Ellipsis />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};

export default Mails;
