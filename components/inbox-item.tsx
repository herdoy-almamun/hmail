"use client";

import { queryClient } from "@/app/query-client-provider";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils"; // Assuming `cn` is an alias for clsx or utility
import { Mail } from "@prisma/client";
import { Avatar, Flex } from "@radix-ui/themes";
import axios from "axios";
import { Ellipsis, Mail as MailIcon, MailOpen } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

interface Props {
  mail: Mail;
}

const InboxItem = ({ mail }: Props) => {
  // Use safe navigation and ensure sender data is available
  const { data: sender } = useUser(mail.sender);

  // Callback to mark mail as read
  const markAsRead = useCallback((id: string) => {
    axios
      .put(`/api/mails/${id}`)
      .then(() => {
        // Invalidate the query after successful update
        queryClient.invalidateQueries({ queryKey: ["mails"] });
        queryClient.invalidateQueries({ queryKey: ["inbox-mails"] });
      })
      .catch((error) => {
        console.error("Failed to mark mail as read:", error);
      });
  }, []);

  // Destructure `mail` for clarity
  const { id, isReaded, subject } = mail;

  return (
    <Flex
      align="center"
      justify="between"
      py="2"
      px="4"
      className={cn("border-b", !isReaded && "bg-purple-50")}
    >
      <Link
        onClick={() => !isReaded && markAsRead(id)} // Only mark as read if not already read
        href={`/${id}`}
        className="flex items-center flex-1 gap-10"
      >
        <Flex align="center" gap="2">
          {/* Use fallback properly for Avatar image */}
          <Avatar
            size="1"
            src={sender?.image ?? undefined}
            fallback={sender?.firstName ?? "User"}
          />
          <p>
            {sender?.firstName} {sender?.lastName}
          </p>
        </Flex>
        <p className="hidden lg:block">{subject}</p>
      </Link>
      <Flex align="center" gap="4">
        {/* Toggle icon depending on whether the mail is read */}
        <div className="cursor-pointer" onClick={() => markAsRead(id)}>
          {isReaded ? <MailOpen /> : <MailIcon />}
        </div>
        <Ellipsis />
      </Flex>
    </Flex>
  );
};

export default InboxItem;
