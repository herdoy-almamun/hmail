import { File, Inbox, SendHorizontal } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu as UISidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Send",
    url: "/send",
    icon: SendHorizontal,
  },
  {
    title: "Draft",
    url: "/draft",
    icon: File,
  },
];
export function SidebarMenu() {
  return (
    <SidebarGroup>
      <UISidebarMenu>
        {items.map((item) => (
          <Link href={item.url} key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
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
