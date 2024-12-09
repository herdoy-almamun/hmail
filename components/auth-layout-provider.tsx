import { Sidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import Header from "../app/header";
const AuthLayoutProvider = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <main>
          <Header />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthLayoutProvider;
