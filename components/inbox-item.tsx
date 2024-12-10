"use client";
import { queryClient } from "@/app/query-client-provider";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Mail } from "@prisma/client";
import { Avatar, Flex } from "@radix-ui/themes";
import axios from "axios";
import { Ellipsis, Mail as MailIcon, MailOpen } from "lucide-react";
import Link from "next/link";

interface Props {
  mail: Mail;
}

const InboxItem = ({ mail }: Props) => {
  const { data: sender } = useUser(mail.sender);
  const markAsRead = (id: string) =>
    axios
      .put(`/api/mails/${id}`)
      .then(() => queryClient.invalidateQueries({ queryKey: ["mails"] }));

  return (
    <Flex
      align="center"
      justify="between"
      py="2"
      px="4"
      className={cn("border-b", !mail.isReaded && "bg-purple-50")}
    >
      <Link
        onClick={() => markAsRead(mail.id)}
        href={`/${mail.id}`}
        className="flex items-center flex-1 gap-10"
      >
        <Flex align="center" gap="2">
          <Avatar size="1" src={sender?.image!} fallback={sender?.firstName!} />
          <p>
            {sender?.firstName} {sender?.lastName}{" "}
          </p>
        </Flex>
        <p className="hidden lg:block"> {mail.subject} </p>
      </Link>
      <Flex align="center" gap="4">
        <div className="cursor-pointer" onClick={() => markAsRead(mail.id)}>
          {mail.isReaded ? <MailOpen /> : <MailIcon />}
        </div>
        <Ellipsis />
      </Flex>
    </Flex>
  );
};

export default InboxItem;
