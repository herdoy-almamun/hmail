"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import { Separator } from "@/components/ui/separator";
import useMail from "@/hooks/use-mail";
import useUser from "@/hooks/use-user";
import { formatDate } from "@/lib/utils";
import { Avatar, Flex } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-provider";
import Replays from "./replays";
import CreateReply from "./create-reply";

interface Props {
  params: Promise<{ id: string }>;
}

const MailDetails = ({ params }: Props) => {
  const [id, setId] = useState<string | null>(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    params.then((resolvedParams) => setId(resolvedParams.id));
  }, [params]);

  const { data: mail } = useMail(id || "");

  const { data: sender } = useUser(mail?.sender!);

  return (
    <AuthLayoutProvider>
      <div className="space-y-3 p-2">
        <h1 className="text-2xl">{mail?.subject}</h1>
        <Separator />
        <Flex align="center" justify="between" className="w-full">
          <Flex align="center" gap="2">
            <Avatar
              radius="full"
              src={sender?.image!}
              fallback={sender?.firstName!}
            />
            <div>
              <h3 className="text-gray-600">
                {sender?.firstName + " " + sender?.lastName}
              </h3>
              <p className="text-sm text-gray-400">
                {user?.id === sender?.id ? `to ${mail?.sender}` : "to me"}
              </p>
            </div>
          </Flex>
          <p className="text-gray-400 text-sm">
            {" "}
            {formatDate(mail?.createdAt!)}{" "}
          </p>
        </Flex>
        <Separator />
        <p>{mail?.body}</p>
        <Separator />
        <CreateReply mailId={mail?.id!} />
        <Replays mailId={mail?.id!} />
      </div>
    </AuthLayoutProvider>
  );
};

export default MailDetails;
