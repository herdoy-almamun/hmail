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
import { Grid } from "@radix-ui/themes";
import axios from "axios";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const joiPassword = Joi.extend(joiPasswordExtendCore);
const formSchema = Joi.object({
  firstName: Joi.string().min(1).max(255).required().label("First Name"),
  lastName: Joi.string().min(1).max(255).required().label("Last Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(1000)
    .required()
    .label("Email"),
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

const RegisterForm = () => {
  const form = useForm<FormData>({
    resolver: joiResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    axios
      .post("/api/auth/register", data)
      .then((res) => {
        if (res.data.success && res.data.token) {
          document.cookie = `token=${res.data.token}; path=/; Secure; SameSite=Strict`;
          toast.success("Register Success");
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }
      })
      .catch((error) => {
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
      <form onSubmit={onSubmit} className="space-y-3 w-full">
        <Grid columns="1fr 1fr" gap="3">
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
        </Grid>
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
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
