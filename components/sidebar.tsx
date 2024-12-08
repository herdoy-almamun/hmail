import {
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  Sidebar as UISidebar,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarMenu } from "./sidebar-menu";

export function Sidebar() {
  return (
    <UISidebar collapsible="icon">
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu />
      </SidebarContent>
      <SidebarRail />
    </UISidebar>
  );
}
