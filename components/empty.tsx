import { Box, Flex, Text } from "@radix-ui/themes";

interface Props {
  page: string;
}

const Empty = ({ page }: Props) => {
  return (
    <Flex align="center" justify="center" direction="column">
      <Box className="text-[200px]">📭</Box>
      <Text size={{ initial: "7", md: "9" }} className="text-gray-400">
        Your {page} is Empty.
      </Text>
    </Flex>
  );
};

export default Empty;
