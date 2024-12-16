"use client";
import { queryClient } from "@/app/query-client-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { Ellipsis, Trash } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

export function DeleteMail({ id }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg mr-4" side="bottom">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              axios.delete(`/api/mails/?id=${id}`).then(() => {
                toast.success("Mail Deleted!");
                queryClient.invalidateQueries({ queryKey: ["inbox-mails"] });
                queryClient.invalidateQueries({ queryKey: ["sent-mails"] });
              })
            }
          >
            <Flex align="center" gap="2" className="cursor-pointer">
              <Box className="text-red-500 mr-2">
                <Trash />
              </Box>
              <Text>Delete</Text>
            </Flex>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
