"use client";
import { HeaderNotification } from "@/components/header-notifications";
import { HeaderUser } from "@/components/header-user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Flex } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-4 px-4 w-full">
        <SidebarTrigger className="-ml-1" />

        <Flex
          onClick={() => router.push("/")}
          className="border rounded-3xl border-gray-300 flex-1 p-2"
          gap="2"
        >
          <Search />
          <input
            type="text"
            className="focus:outline-none border-none w-full"
            placeholder="Search mail"
          />
        </Flex>
        <Flex align="center" gap={{ initial: "2", md: "6" }}>
          <HeaderNotification />
          <HeaderUser />
        </Flex>
      </div>
    </header>
  );
};

export default Header;
