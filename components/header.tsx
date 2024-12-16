"use client";

import { HeaderNotification } from "@/components/header-notifications";
import { HeaderUser } from "@/components/header-user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useInboxMailQueryStory, useSentMailQueryStory } from "@/store";
import { Flex } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const Header = () => {
  const router = useRouter();
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const currentPath = usePathname();
  const setSubjectInboxMails = useInboxMailQueryStory((s) => s.setSubject);
  const setSubjectSentMails = useSentMailQueryStory((s) => s.setSubject);

  const handlePageChange = () => {
    if (currentPath !== "/" && currentPath !== "/sents") {
      router.push("/");
    }
    return null;
  };

  useEffect(() => {
    if (searchBoxRef.current && currentPath === "/") {
      searchBoxRef.current.focus();
    }
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-4 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Flex
          onClick={handlePageChange}
          className="border rounded-3xl border-gray-300 flex-1 p-2"
          gap="2"
        >
          <Search />

          <input
            type="text"
            ref={searchBoxRef}
            onChange={(e) => {
              const value = e.target.value;
              currentPath === "/" && setSubjectInboxMails(value);
              currentPath === "/sents" && setSubjectSentMails(value);
            }}
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

export default function HeaderWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
    </Suspense>
  );
}
