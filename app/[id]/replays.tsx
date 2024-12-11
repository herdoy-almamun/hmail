"use client";
import { Accordion } from "@/components/ui/accordion";
import useReplays from "@/hooks/use-replays";
import ReplyItem from "./reply";
interface Props {
  mailId: string;
}

const Replays = ({ mailId }: Props) => {
  const { data: replys } = useReplays(mailId);
  if (!replys) return null;
  return (
    <Accordion type="single" collapsible>
      {replys.map((reply) => (
        <ReplyItem reply={reply} key={reply.id} />
      ))}
    </Accordion>
  );
};

export default Replays;
