import { Flex, Skeleton } from "@radix-ui/themes";
import AuthLayoutProvider from "../auth-layout-provider";

export default function MailsKkeleton() {
  return (
    <AuthLayoutProvider>
      <Flex direction="column" className="w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <Flex
            key={i}
            align="center"
            justify="between"
            py="2"
            px="4"
            className="w-full"
          >
            <Flex align="center" gap="2">
              <Skeleton className="w-5 h-5 rounded-md" />
              <Skeleton className="w-20 h-5" />
            </Flex>
            <Skeleton className="hidden w-40 h-5 lg:block" />
            <Flex align="center" gap="4">
              <Skeleton className="w-5 h-5 rounded-md" />{" "}
              <Skeleton className="w-5 h-5 rounded-md" />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </AuthLayoutProvider>
  );
}
