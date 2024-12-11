"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "@/lib/utils";
import { Reply, User } from "@prisma/client";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  reply: Reply;
}

const ReplyItem = ({ reply }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    axios
      .get<User>(`/api/user/?id=${reply.userId}`)
      .then((res) => setUser(res.data));
  }, [reply]);

  if (!user) return null;
  return (
    <AccordionItem value={reply.id}>
      <AccordionTrigger>
        <Flex align="center" gap="3">
          <Avatar radius="full" src={user.image} fallback={user.firstName} />
          <Flex direction="column">
            <Text>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text className="text-sm text-gray-400">
              {formatDate(reply.createdAt)}
            </Text>
          </Flex>
        </Flex>
      </AccordionTrigger>
      <AccordionContent>{reply.reply}</AccordionContent>
    </AccordionItem>
  );
};

export default ReplyItem;
