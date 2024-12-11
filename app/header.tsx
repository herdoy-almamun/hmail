"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMailQueryStory } from "@/store";
import { Flex } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { HeaderNotification } from "./header-notifications";
import { HeaderUser } from "./header-user";

const Header = () => {
  const setSubject = useMailQueryStory((s) => s.setSuject);
  const currentPath = usePathname();
  const router = useRouter();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b">
      <div className="flex items-center gap-4 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Flex
          onClick={() => {
            currentPath !== "/" && currentPath !== "/sents"
              ? router.push("/")
              : null;
          }}
          className="border rounded-3xl border-gray-300 flex-1 p-2"
          gap="2"
        >
          <Search />{" "}
          <input
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            className="focus:outline-none border-none"
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
