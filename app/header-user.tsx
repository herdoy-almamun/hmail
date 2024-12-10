"use client";

import { BadgeCheck, LogOut } from "lucide-react";
import { AuthContext } from "@/app/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "@/lib/utils";
import { Avatar } from "@radix-ui/themes";
import Image from "next/image";
import { useContext } from "react";

export function HeaderUser() {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar radius="full" src={user.image} fallback={user.firstName} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg mr-4" side="bottom">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Image
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
              src={user.image}
              alt={user.firstName}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user.firstName} {user.lastName}{" "}
              </span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            deleteCookie("token");
            window.location.href = "/login";
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
