"use client";

import { Button } from "@/components/ui/button";
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
import axios from "axios";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const joiPassword = Joi.extend(joiPasswordExtendCore);

const formSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .doesNotInclude(["password"])
    .required(),
});

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: joiResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    setLoading(true);
    axios
      .post("/api/auth/login", data)
      .then((res) => {
        setLoading(false);
        if (res.data.success && res.data.token) {
          document.cookie = `token=${res.data.token}; path=/; Secure; SameSite=Strict`;
          toast.success("Login Success");
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        }
        if (error.response.status === 404) {
          toast.error("Something went worn!");
        }
        if (error.response.status >= 500) {
          toast.error("Internal server error");
        }
      });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? <BeatLoader color="#fff" /> : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
