import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
export function SidebarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton>
            <Image src="/logo.png" width={30} height={30} alt="logo" />
            <span className="text-2xl"> Hmail </span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
