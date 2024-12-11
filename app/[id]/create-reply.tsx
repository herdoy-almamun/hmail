"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../auth-provider";
import { queryClient } from "../query-client-provider";

interface Props {
  mailId: string;
}

const CreateReply = ({ mailId }: Props) => {
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Replay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Reply</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write your message"
          />
        </div>
        <div>
          <Button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              axios
                .post("/api/replays", { mailId, reply, userId: user.id })
                .then(() => {
                  setReply("");
                  queryClient.invalidateQueries({ queryKey: ["replays"] });
                  setLoading(false);
                  setOpen(false);
                });
            }}
          >
            {loading ? "Loading..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReply;
