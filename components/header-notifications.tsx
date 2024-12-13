"use client";
import { AuthContext } from "@/app/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMails from "@/hooks/use-mails";
import { Flex } from "@radix-ui/themes";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export function HeaderNotification() {
  const { user } = useContext(AuthContext);
  const { mails } = useMails();
  const inboxMails = mails?.filter((m) => m.sender !== user?.email);
  const countUnreadMail = inboxMails?.filter(
    (m) => m.isReaded === false
  ).length;
  if (countUnreadMail && countUnreadMail <= 0)
    return (
      <Flex
        align="center"
        justify="center"
        className="w-10 h-10 rounded-full bg-gray-200"
      >
        <Bell />
      </Flex>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Flex
          align="center"
          justify="center"
          className="w-10 h-10 rounded-full bg-gray-200 relative"
        >
          <Bell />
          <Flex
            align="center"
            justify="center"
            className="bg-primary text-white text-[10px] w-4 h-4 rounded-full absolute -bottom-1 -right-1"
          >
            {countUnreadMail}
          </Flex>
        </Flex>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg mr-4" side="bottom">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/">You hav {countUnreadMail} unread message.</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
