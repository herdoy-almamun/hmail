"use client";
import { File, Inbox, SendHorizontal } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu as UISidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Inbox",
    url: "/",
    icon: Inbox,
  },
  {
    title: "Sents",
    url: "/sents",
    icon: SendHorizontal,
  },
  {
    title: "Draft",
    url: "/draft",
    icon: File,
  },
];
export function SidebarMenu() {
  const currentPath = usePathname();
  return (
    <SidebarGroup>
      <UISidebarMenu>
        {items.map((item) => (
          <Link href={item.url} key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  "hover:text-primary",
                  currentPath === item.url && "text-primary"
                )}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </UISidebarMenu>
    </SidebarGroup>
  );
}
