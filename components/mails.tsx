"use client";

import { queryClient } from "@/app/query-client-provider";
import { cn } from "@/lib/utils";
import { Mail } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { Ellipsis, Mail as MailIcon, MailOpen } from "lucide-react";

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
          className={cn("border-b", !mail.isReaded && "bg-purple-50")}
        >
          <h1> {mail.sender} </h1>
          <p className="hidden lg:block"> {mail.body?.slice(0, 50)} ... </p>
          <Flex align="center" gap="4">
            <div
              className="cursor-pointer"
              onClick={() =>
                axios
                  .put(`/api/mails/${mail.id}`)
                  .then(() =>
                    queryClient.invalidateQueries({ queryKey: ["mails"] })
                  )
              }
            >
              {mail.isReaded ? <MailOpen /> : <MailIcon />}
            </div>
            <Ellipsis />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};

export default Mails;
