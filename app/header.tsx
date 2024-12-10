import { SidebarTrigger } from "@/components/ui/sidebar";
import { Flex } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { HeaderUser } from "./header-user";

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b">
      <div className="flex items-center gap-4 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Flex className="border rounded-3xl border-gray-300 flex-1 p-2" gap="2">
          <Search />{" "}
          <input
            type="text"
            className="focus:outline-none border-none"
            placeholder="Search mail"
          />
        </Flex>
        <HeaderUser />
      </div>
    </header>
  );
};

export default Header;
