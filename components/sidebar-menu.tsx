"use client";
import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu as UISidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { File, Inbox, PencilIcon, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Compose",
    url: "/compose",
    icon: PencilIcon,
  },
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
    url: "/drafts",
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
                  currentPath === item.url &&
                    "text-primary border border-primary"
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
