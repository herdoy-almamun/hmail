import { Box, Flex, Text } from "@radix-ui/themes";
import AuthLayoutProvider from "./auth-layout-provider";

const Empty = () => {
  return (
    <AuthLayoutProvider>
      <Flex align="center" justify="center" direction="column">
        <Box className="text-[200px]">📭</Box>
        <Text size={{ initial: "7", md: "9" }} className="text-gray-400">
          Your Inbox is Empty.
        </Text>
      </Flex>
    </AuthLayoutProvider>
  );
};

export default Empty;
