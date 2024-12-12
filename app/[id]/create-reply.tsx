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
import { toast } from "react-toastify"; // For error or success notifications
import { PulseLoader } from "react-spinners"; // For spinner (if not already included in the project)

interface Props {
  mailId: string;
}

const CreateReply = ({ mailId }: Props) => {
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const handleReply = async () => {
    if (!reply.trim()) return; // Don't send empty replies

    setLoading(true);
    try {
      await axios.post("/api/replays", { mailId, reply, userId: user.id });
      setReply(""); // Reset the reply input field
      queryClient.invalidateQueries({ queryKey: ["replays"] }); // Refresh replays data
      toast.success("Reply sent successfully!");
      setOpen(false); // Close dialog after sending the reply
    } catch (error) {
      toast.error("Failed to send reply, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Reply</Button>
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
        <div className="flex justify-end">
          <Button
            disabled={loading || !reply.trim()}
            onClick={handleReply}
            className="w-full max-w-[120px]"
          >
            {loading ? <PulseLoader color="#fff" size={10} /> : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReply;
