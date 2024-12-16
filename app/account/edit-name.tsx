"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { joiResolver } from "@hookform/resolvers/joi";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import Joi from "joi";
import { PencilIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../auth-provider";
import { queryClient } from "../query-client-provider";

interface FormData {
  firstName: string;
  lastName: string;
}

const formSchema = Joi.object({
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
});

export function EditName() {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<FormData>({
    resolver: joiResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    setLoading(true);
    axios
      .put(`/api/user/?id=${user?.id}`, data)
      .then((res) => {
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["auth-user"] });
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Flex
          align="center"
          justify="center"
          className="cursor-pointer w-10 h-10 bg-gray-200 border"
        >
          <PencilIcon className="text-sm" />
        </Flex>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Your Name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button disabled={isLoading} className="w-full" type="submit">
                  {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
