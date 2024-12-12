"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMailQueryStory } from "@/store";
import { Flex } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { HeaderNotification } from "./header-notifications";
import { HeaderUser } from "./header-user";

const Header = () => {
  const pathName = usePathname(); // Only need this one variable
  const router = useRouter();

  const setSubjectInboxMail = useMailQueryStory((s) => s.setSubjectInboxMail);
  const setSubjectSentMail = useMailQueryStory((s) => s.setSubjectSentMail);

  // Refactored search input change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchValue = e.target.value.toLocaleLowerCase();

    if (pathName === "/") {
      setSubjectInboxMail(searchValue);
    } else if (pathName === "/sents") {
      setSubjectSentMail(searchValue);
    }
  };

  // Refactor to simplify the navigation logic
  const handleSearchClick = () => {
    if (pathName !== "/" && pathName !== "/sents") {
      router.push("/");
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b">
      <div className="flex items-center gap-4 px-4 w-full">
        <SidebarTrigger className="-ml-1" />

        {/* Search bar */}
        <Flex
          onClick={handleSearchClick} // Simplified onClick logic
          className="border rounded-3xl border-gray-300 flex-1 p-2"
          gap="2"
        >
          <Search />
          <input
            type="text"
            onChange={handleSearchChange} // Use the refactored search handler
            className="focus:outline-none border-none"
            placeholder="Search mail"
          />
        </Flex>

        {/* Header Notifications and User */}
        <Flex align="center" gap={{ initial: "2", md: "6" }}>
          <HeaderNotification />
          <HeaderUser />
        </Flex>
      </div>
    </header>
  );
};

export default Header;
