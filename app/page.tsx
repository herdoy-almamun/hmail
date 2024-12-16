"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Pagination from "@/components/pagination";
import { useInboxMails } from "@/hooks/use-inbox-mails";
import { useInboxMailQueryStory } from "@/store";
import { useContext } from "react";
import { AuthContext } from "./auth-provider";
import InboxMails from "./inbox-mails";

const Home = () => {
  const { user } = useContext(AuthContext);
  const page = useInboxMailQueryStory((s) => s.page);
  const pageSize = useInboxMailQueryStory((s) => s.pageSize);
  const setPage = useInboxMailQueryStory((s) => s.setPage);
  const { data } = useInboxMails(user?.email!);
  if (!data) return null;
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <InboxMails mails={data.data} />
        <Pagination
          itemsCount={data.count}
          pageSize={pageSize}
          setPage={setPage}
          currentPage={page}
        />
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
