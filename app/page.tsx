"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Empty from "@/components/empty";
import Pagination from "@/components/pagination";
import MailsKkeleton from "@/components/skeletons/mails-skeleton";
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
  if (!data) return <MailsKkeleton />;

  return (
    <AuthLayoutProvider>
      <div className="p-2">
        {data.count === 0 ? <Empty /> : <InboxMails mails={data.data} />}
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
