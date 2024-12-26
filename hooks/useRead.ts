import { queryClient } from "@/app/query-client-provider";
import { Mail } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useRead = () =>
  useMutation({
    mutationFn: (id: string) =>
      axios.put(`/api/mails/${id}`).then((res) => res.data),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["inbox-mails"] });

      const previousMails =
        queryClient.getQueryData<Mail[]>(["inbox-mails"]) || [];

      // Update the mail to mark it as read
      queryClient.setQueryData<Mail[]>(["inbox-mails"], (oldMails = []) =>
        oldMails.map((mail) =>
          mail.id === id ? { ...mail, isReaded: true ? false : true } : mail
        )
      );

      return { previousMails };
    },

    onError: (err, id, context) => {
      if (context?.previousMails) {
        queryClient.setQueryData(["inbox-mails"], context.previousMails);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["inbox-mails"] });
    },
  });

export default useRead;
