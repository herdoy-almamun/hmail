"use client";

import { AuthContext } from "@/app/auth-provider";
import useMail from "@/hooks/use-mail";
import { Flex } from "@radix-ui/themes";
import { Ellipsis, Mail as MailIcon } from "lucide-react";
import { useContext } from "react";

const Inboxs = () => {
  const { user } = useContext(AuthContext);
  const { inboxMails } = useMail(user?.email!);

  return (
    <div>
      {inboxMails.map((mail) => (
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

export default Inboxs;
