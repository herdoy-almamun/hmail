"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { AuthContext } from "../auth-provider";
import { EditName } from "./edit-name";
import EditProfileImage from "./edit-profile-image";

export default function Account() {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <AuthLayoutProvider>
      <Flex
        className="w-full"
        direction="column"
        gap="2"
        align="center"
        justify="center"
        p="4"
      >
        <Box className="relative">
          <Avatar
            src={user.image}
            fallback={user.lastName}
            size={{ initial: "5", md: "9" }}
            radius="full"
          />
          <EditProfileImage />
        </Box>
        <Text size="4" color="gray">
          {user.email}
        </Text>
        <Flex align="center" gap="2">
          <Text size="7">
            {user.firstName} {user.lastName}
          </Text>
          <EditName />
        </Flex>
      </Flex>
    </AuthLayoutProvider>
  );
}
