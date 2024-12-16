"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import { Separator } from "@/components/ui/separator";
import { Flex, Skeleton } from "@radix-ui/themes";

const MailDetailsSkeleton = () => {
  return (
    <AuthLayoutProvider>
      <div className="space-y-3 p-2">
        <Skeleton className="w-full h-9" />
        <Separator />
        <Flex align="center" justify="between" className="w-full">
          <Flex align="center" gap="2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-10 h-5" />
            </div>
          </Flex>
          <Skeleton className="w-14 h-5" />
        </Flex>
        <Separator />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Separator />
        <Skeleton className="w-[80px] h-10 rounded-full" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </AuthLayoutProvider>
  );
};

export default MailDetailsSkeleton;
