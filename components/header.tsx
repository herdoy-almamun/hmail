"use client";

import { HeaderNotification } from "@/components/header-notifications";
import { HeaderUser } from "@/components/header-user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Flex } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const Header = () => {
  const [subject, setSubject] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname();

  const handlePageChange = (subject: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update query parameters
    params.delete("page");
    params.set("subject", subject.toLowerCase());

    const query = params.toString();
    const isHomeOrSents = currentPath === "/" || currentPath === "/sents";

    // Construct and navigate to the target path
    const targetPath = isHomeOrSents ? `?${query}` : `/?${query}`;
    router.push(targetPath);
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-4 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Flex className="border rounded-3xl border-gray-300 flex-1 p-2" gap="2">
          <Search />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePageChange(subject);
            }}
          >
            <input
              type="text"
              onChange={(e) => setSubject(e.target.value)}
              className="focus:outline-none border-none w-full"
              placeholder="Search mail"
            />
          </form>
        </Flex>
        <Flex align="center" gap={{ initial: "2", md: "6" }}>
          <HeaderNotification />
          <HeaderUser />
        </Flex>
      </div>
    </header>
  );
};

export default function HeaderWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
    </Suspense>
  );
}
