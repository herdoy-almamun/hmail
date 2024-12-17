import { Box, Flex, Text } from "@radix-ui/themes";

const Empty = () => {
  return (
    <Flex align="center" justify="center" direction="column">
      <Box className="text-[200px]">📭</Box>
      <Text size={{ initial: "7", md: "9" }} className="text-gray-400">
        Your Inbox is Empty.
      </Text>
    </Flex>
  );
};

export default Empty;
