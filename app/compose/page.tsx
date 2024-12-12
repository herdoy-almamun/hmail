"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../auth-provider";
import { queryClient } from "../query-client-provider";

const Compose = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const isSelectReceiver = receiver.slice(-4) === ".com" ? true : false;
    const setEmail = receiver && !isSelectReceiver ? receiver : null;
    axios
      .get<User[]>(`/api/users/?email=${setEmail}`)
      .then((res) => setUsers(res.data.filter((u) => u.id !== user?.id)));
  }, [receiver]);

  return (
    <AuthLayoutProvider>
      <Grid className="h-[calc(100dvh-4rem)] px-2" rows="50px 50px 1fr 50px">
        <div className="relative border-b w-full">
          <input
            className="p-2 w-full h-full focus:outline-none"
            type="email"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="To"
          />
          {users && receiver && (
            <div className="absolute top-[40px] left-0 bg-white py-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setReceiver(user.email);
                    setUsers([]);
                  }}
                >
                  <span> {user.email} </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          className="border-b p-2 focus:outline-none"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Subject"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border-none p-2 focus:outline-none"
        />
        <Flex align="center" gap="3" className="border-t">
          <Button
            disabled={!receiver || !subject || !body}
            onClick={() => {
              if (!receiver || !subject || !body) return;
              axios
                .post("/api/mails", {
                  sender: user?.email,
                  receiver,
                  subject,
                  body,
                })
                .then(() => {
                  setReceiver("");
                  setSubject("");
                  setBody("");
                  toast.success("Successfully sent mail");
                  queryClient.invalidateQueries({ queryKey: ["mails"] });
                  queryClient.invalidateQueries({ queryKey: ["sent-mails"] });
                });
            }}
            type="submit"
          >
            Sent
          </Button>
        </Flex>
      </Grid>
    </AuthLayoutProvider>
  );
};

export default Compose;
